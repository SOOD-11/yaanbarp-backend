#!/usr/bin/env python3
"""
Automated Audio Generation for Blog Posts
Uses Google Text-to-Speech (gTTS) to create natural-sounding MP3 files
"""

import os
import re
import json
from gtts import gTTS
from pathlib import Path
import argparse
import sys

def clean_html_content(html_text):
    """Remove HTML tags and clean up text for TTS"""
    # Remove HTML tags
    clean_text = re.sub(r'<[^>]+>', '', html_text)
    
    # Replace HTML entities
    clean_text = clean_text.replace('&amp;', 'and')
    clean_text = clean_text.replace('&lt;', '<')
    clean_text = clean_text.replace('&gt;', '>')
    clean_text = clean_text.replace('&quot;', '"')
    clean_text = clean_text.replace('&#39;', "'")
    clean_text = clean_text.replace('&nbsp;', ' ')
    
    # Clean up whitespace
    clean_text = re.sub(r'\s+', ' ', clean_text)
    clean_text = clean_text.strip()
    
    return clean_text

def extract_blog_content(content_parts, title, excerpt):
    """Extract and combine blog content parts into readable text"""
    full_text = f"Title: {title}\n\n"
    
    # Use the full content parts instead of just the excerpt
    for part in content_parts:
        cleaned_part = clean_html_content(part)
        if cleaned_part.strip():
            full_text += cleaned_part + "\n\n"
    
    return full_text

def generate_audio(text, output_path, lang='en', tld='com', slow=False):
    """Generate audio file using gTTS"""
    try:
        print(f"🎯 Generating audio for: {output_path}")
        tts = gTTS(text=text, lang=lang, tld=tld, slow=slow)
        tts.save(output_path)
        print(f"✅ Audio saved: {output_path}")
        return True
    except Exception as e:
        print(f"❌ Error generating audio: {e}")
        return False

def parse_blog_data(file_path):
    """Parse the TypeScript blog data file"""
    print(f"📖 Reading blog data from: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the blogPosts array
    posts_match = re.search(r'export const blogPosts: BlogPost\[\] = \[(.*)\];', content, re.DOTALL)
    if not posts_match:
        raise ValueError("Could not find blogPosts array in the file")
    
    posts_content = posts_match.group(1)
    
    # Extract individual blog posts
    blog_posts = []
    
    # Split by posts using the id field as delimiter
    post_sections = re.split(r'\s*\{\s*id:\s*[\'"]([^\'"]+)[\'"]', posts_content)
    
    # Process pairs of (id, content)
    for i in range(1, len(post_sections), 2):
        if i + 1 < len(post_sections):
            post_id = post_sections[i]
            post_content = post_sections[i + 1]
            
            post = {'id': post_id}
            
            # Extract basic fields
            title_match = re.search(r"title:\s*'([^']*)'\s", post_content)
            excerpt_match = re.search(r"excerpt:\s*'([^']*)'\s", post_content)
            audio_match = re.search(r"audioAvailable:\s*(true|false)", post_content)
            
            if title_match and excerpt_match:
                post['title'] = title_match.group(1)
                post['excerpt'] = excerpt_match.group(1)
                post['audioAvailable'] = audio_match and audio_match.group(1) == 'true'
                
                # Extract contentParts array - look for the opening bracket and find the matching closing bracket
                content_parts_start = post_content.find('contentParts')
                if content_parts_start != -1:
                    bracket_start = post_content.find('[', content_parts_start)
                    if bracket_start != -1:
                        # Find the matching closing bracket
                        bracket_count = 0
                        bracket_end = bracket_start
                        for j, char in enumerate(post_content[bracket_start:]):
                            if char == '[':
                                bracket_count += 1
                            elif char == ']':
                                bracket_count -= 1
                                if bracket_count == 0:
                                    bracket_end = bracket_start + j
                                    break
                        
                        if bracket_end > bracket_start:
                            parts_content = post_content[bracket_start+1:bracket_end]
                            # Extract template literals (backtick strings)
                            parts = re.findall(r'`([^`]*(?:`[^`]*`[^`]*)*)`', parts_content, re.DOTALL)
                            post['contentParts'] = parts
                
                if post.get('contentParts'):
                    blog_posts.append(post)
    
    print(f"📚 Found {len(blog_posts)} blog posts")
    return blog_posts

def main():
    parser = argparse.ArgumentParser(description='Generate audio files for blog posts')
    parser.add_argument('--blog-data', default='src/lib/blogData.ts', 
                       help='Path to blogData.ts file')
    parser.add_argument('--output-dir', default='public/assets/audio', 
                       help='Output directory for audio files')
    parser.add_argument('--post-id', help='Generate audio for specific post ID only')
    parser.add_argument('--lang', default='en', help='Language code for TTS (default: en)')
    parser.add_argument('--tld', default='com', help='TLD for voice selection (com, co.uk, co.in, etc.)')
    parser.add_argument('--slow', action='store_true', help='Generate slower speech')
    parser.add_argument('--force', action='store_true', help='Regenerate existing audio files')
    
    args = parser.parse_args()
    
    # Create output directory
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Parse blog data
    try:
        blog_posts = parse_blog_data(args.blog_data)
    except Exception as e:
        print(f"❌ Error parsing blog data: {e}")
        sys.exit(1)
    
    # Filter posts if specific ID requested
    if args.post_id:
        blog_posts = [post for post in blog_posts if post['id'] == args.post_id]
        if not blog_posts:
            print(f"❌ No post found with ID: {args.post_id}")
            sys.exit(1)
    
    # Filter posts that have audioAvailable: true
    audio_posts = [post for post in blog_posts if post.get('audioAvailable', False)]
    print(f"🎵 Processing {len(audio_posts)} posts with audio enabled")
    
    success_count = 0
    
    for post in audio_posts:
        post_id = post['id']
        title = post['title']
        
        output_file = output_dir / f"{post_id}.mp3"
        
        # Skip if file exists and not forced
        if output_file.exists() and not args.force:
            print(f"⏭️  Skipping {post_id} - audio file already exists")
            continue
        
        print(f"\n🎬 Processing: {title}")
        
        # Extract and clean content
        text_content = extract_blog_content(
            post['contentParts'], 
            title, 
            post['excerpt']
        )
        
        # Generate audio
        if generate_audio(text_content, str(output_file), args.lang, args.tld, args.slow):
            success_count += 1
        else:
            print(f"❌ Failed to generate audio for: {title}")
    
    print(f"\n🎉 Generation complete! Successfully created {success_count} audio files")
    print(f"📁 Audio files saved in: {output_dir}")

if __name__ == "__main__":
    main()
