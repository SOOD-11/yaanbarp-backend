#!/usr/bin/env python3
"""
Debug script to see what content is being extracted
"""

import re

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
    
    # Find Pilivesha post specifically
    pilivesha_match = re.search(r'\{\s*id:\s*[\'"]Pilivesha[\'"][^}]*contentParts\s*:\s*\[(.*?)\]', posts_content, re.DOTALL)
    
    if pilivesha_match:
        content_parts_text = pilivesha_match.group(1)
        print("Raw contentParts text:")
        print("=" * 50)
        print(content_parts_text[:500] + "..." if len(content_parts_text) > 500 else content_parts_text)
        print("=" * 50)
        
        # Extract strings from the array
        parts = re.findall(r'`([^`]*)`', content_parts_text, re.DOTALL)
        
        print(f"\nFound {len(parts)} content parts")
        
        for i, part in enumerate(parts):
            cleaned = clean_html_content(part)
            print(f"\nPart {i+1} (length: {len(cleaned)} chars):")
            print("-" * 30)
            print(cleaned[:200] + "..." if len(cleaned) > 200 else cleaned)
    else:
        print("Could not find Pilivesha post content")

if __name__ == "__main__":
    parse_blog_data('src/lib/blogData.ts')
