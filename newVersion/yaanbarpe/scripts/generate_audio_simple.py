#!/usr/bin/env python3
"""
Simple and reliable audio generation script
Uses a simpler approach to extract content from blogData.ts
"""

import os
import re
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

def extract_content_for_post(file_content, post_id):
    """Extract content for a specific post ID"""
    # Find the post by ID
    pattern = rf"id:\s*'{post_id}'[^}}]*contentParts\s*:\s*\[(.*?)\]"
    match = re.search(pattern, file_content, re.DOTALL)
    
    if not match:
        return None
    
    content_parts_section = match.group(1)
    
    # Extract all template literals (backtick strings)
    template_literals = []
    current_pos = 0
    
    while True:
        # Find the next backtick
        start = content_parts_section.find('`', current_pos)
        if start == -1:
            break
        
        # Find the matching closing backtick
        end = start + 1
        backtick_count = 1
        
        while end < len(content_parts_section) and backtick_count > 0:
            if content_parts_section[end] == '`':
                backtick_count -= 1
            end += 1
        
        if backtick_count == 0:
            # Extract the content between backticks
            content = content_parts_section[start+1:end-1]
            template_literals.append(content)
            current_pos = end
        else:
            break
    
    return template_literals

def get_post_metadata(file_content, post_id):
    """Get title and other metadata for a post"""
    # Find the post section
    pattern = rf"id:\s*'{post_id}'[^}}]*?title:\s*'([^']*)'[^}}]*?audioAvailable:\s*(true|false)"
    match = re.search(pattern, file_content, re.DOTALL)
    
    if match:
        title = match.group(1)
        audio_available = match.group(2) == 'true'
        return title, audio_available
    
    return None, False

def generate_audio_for_post(file_content, post_id, output_dir, lang='en', tld='com', slow=False):
    """Generate audio for a specific post"""
    # Get metadata
    title, audio_available = get_post_metadata(file_content, post_id)
    
    if not title:
        print(f"❌ Post '{post_id}' not found")
        return False
    
    if not audio_available:
        print(f"⏭️ Post '{post_id}' doesn't have audio enabled")
        return False
    
    print(f"🎬 Processing: {title}")
    
    # Extract content
    content_parts = extract_content_for_post(file_content, post_id)
    
    if not content_parts:
        print(f"❌ No content found for post '{post_id}'")
        return False
    
    print(f"📝 Found {len(content_parts)} content parts")
    
    # Combine all content parts
    full_text = f"Title: {title}\n\n"
    
    for i, part in enumerate(content_parts):
        cleaned_part = clean_html_content(part)
        if cleaned_part.strip():
            full_text += cleaned_part + "\n\n"
            print(f"   Part {i+1}: {len(cleaned_part)} characters")
    
    print(f"📊 Total content length: {len(full_text)} characters")
    
    # Generate audio
    output_file = output_dir / f"{post_id}.mp3"
    
    try:
        print(f"🎯 Generating audio for: {output_file}")
        tts = gTTS(text=full_text, lang=lang, tld=tld, slow=slow)
        tts.save(str(output_file))
        print(f"✅ Audio saved: {output_file}")
        return True
    except Exception as e:
        print(f"❌ Error generating audio: {e}")
        return False

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
    
    args = parser.parse_args()
    
    # Create output directory
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Read blog data file
    try:
        with open(args.blog_data, 'r', encoding='utf-8') as f:
            file_content = f.read()
        print(f"📖 Read blog data from: {args.blog_data}")
    except Exception as e:
        print(f"❌ Error reading blog data: {e}")
        sys.exit(1)
    
    if args.post_id:
        # Generate for specific post
        success = generate_audio_for_post(file_content, args.post_id, output_dir, args.lang, args.tld, args.slow)
        if success:
            print("🎉 Audio generation complete!")
        else:
            print("❌ Audio generation failed!")
    else:
        # Find all posts with audioAvailable: true
        audio_posts = re.findall(r"id:\s*'([^']*)'[^}]*audioAvailable:\s*true", file_content)
        print(f"🎵 Found {len(audio_posts)} posts with audio enabled")
        
        success_count = 0
        for post_id in audio_posts:
            if generate_audio_for_post(file_content, post_id, output_dir, args.lang, args.tld, args.slow):
                success_count += 1
        
        print(f"\n🎉 Generation complete! Successfully created {success_count} audio files")

if __name__ == "__main__":
    main()
