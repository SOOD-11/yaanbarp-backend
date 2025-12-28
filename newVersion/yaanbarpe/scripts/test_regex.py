#!/usr/bin/env python3
import re

# Read the file
with open('src/lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Look for Pilivesha specifically
post_id = 'Pilivesha'
pattern = rf"id:\s*'{post_id}'[^}}]*contentParts\s*:\s*\[(.*?)\]"
match = re.search(pattern, content, re.DOTALL)

if match:
    print("✅ Found match!")
    content_parts_text = match.group(1)
    print("Captured group length:", len(content_parts_text))
    print("Raw captured text:")
    print(repr(content_parts_text))
    print("\n" + "="*80 + "\n")
    
    # Find all backtick-quoted content parts (multi-line)
    # Pattern matches backticks with any content including newlines
    backtick_pattern = r'`(.*?)`'
    backtick_matches = re.findall(backtick_pattern, content_parts_text, re.DOTALL)
    
    print(f"Found {len(backtick_matches)} content parts:")
    for i, part in enumerate(backtick_matches):
        print(f"Part {i+1}: {len(part)} characters")
        print(f"First 200 chars: {part[:200]}...")
        print("-" * 50)
else:
    print("❌ No match found")
    
    # Try to find the post section manually
    pilivesha_start = content.find("id: 'Pilivesha'")
    if pilivesha_start != -1:
        print(f"Found Pilivesha at position {pilivesha_start}")
        section = content[pilivesha_start:pilivesha_start+1000]
        print("Section around Pilivesha:")
        print(section)
        
        # Look for contentParts
        contentParts_pos = section.find('contentParts')
        if contentParts_pos != -1:
            print(f"Found contentParts at relative position {contentParts_pos}")
        else:
            print("contentParts not found in this section")
    else:
        print("Pilivesha not found at all")
