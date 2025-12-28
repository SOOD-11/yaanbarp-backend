# 🎵 Blog Audio Generation System

This system automatically generates natural-sounding MP3 audio files from your blog posts using Google Text-to-Speech (gTTS).

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   pip install gtts
   ```

2. **Generate audio for all posts:**
   ```bash
   python scripts/generate_audio.py
   ```

3. **Your audio files will be saved to `public/assets/audio/`**

## 📖 Features

### ✨ Natural Voice Quality
- Uses Google's Text-to-Speech API for human-like voices
- Much better quality than browser-based TTS
- Multiple accent options (US, UK, Indian, etc.)

### 🎯 Smart Content Processing
- Automatically extracts content from TypeScript blog data
- Removes HTML tags and formatting
- Cleans up text for optimal speech synthesis

### 🔄 Automated Workflow
- Processes all posts with `audioAvailable: true`
- Skips existing files (unless `--force` is used)
- Provides progress feedback and error handling

## 🛠️ Usage Options

### Basic Commands

```bash
# Generate all audio files
python scripts/generate_audio.py

# Generate specific post
python scripts/generate_audio.py --post-id "Pilivesha"

# Use British English voice
python scripts/generate_audio.py --tld co.uk

# Generate slower speech
python scripts/generate_audio.py --slow

# Force regenerate existing files
python scripts/generate_audio.py --force
```

### Voice Options (--tld parameter)

- `com` - US English (default)
- `co.uk` - British English
- `co.in` - Indian English
- `com.au` - Australian English
- `ca` - Canadian English

### Advanced Options

```bash
# Custom output directory
python scripts/generate_audio.py --output-dir custom/path

# Custom blog data file
python scripts/generate_audio.py --blog-data custom/blogData.ts

# Different language (if your blog supports it)
python scripts/generate_audio.py --lang es --tld es
```

## 🔧 Integration with React

The `TextToSpeech` component automatically detects and plays the generated MP3 files:

```tsx
<TextToSpeech 
  text={post.content} 
  title={post.title} 
  id={post.id}  // Used to find the MP3 file
/>
```

The component will look for audio files at `/assets/audio/{id}.mp3`.

## 📁 File Structure

```
├── scripts/
│   ├── generate_audio.py    # Main generation script
│   ├── requirements.txt     # Python dependencies
│   └── README.md           # This file
├── public/
│   └── assets/
│       └── audio/          # Generated MP3 files
│           ├── Pilivesha.mp3
│           ├── Delta-Point.mp3
│           └── ...
└── src/
    └── components/
        └── blog-parts/
            └── TextToSpeech.tsx  # Audio player component
```

## 🎛️ Configuration

### Blog Post Setup

Ensure your blog posts have `audioAvailable: true`:

```typescript
{
  id: 'Pilivesha',
  title: 'Pilivesha',
  audioAvailable: true,  // This enables audio generation
  // ... other fields
}
```

### Audio Quality Settings

The script uses optimized settings for blog content:
- **Rate**: Normal speed (not slow by default)
- **Voice**: Best available for selected region
- **Format**: MP3 for web compatibility

## 🔍 Troubleshooting

### Common Issues

1. **"No posts found"**
   - Check that your blog posts have `audioAvailable: true`
   - Verify the path to your `blogData.ts` file

2. **"gTTS error"**
   - Check internet connection (gTTS requires online access)
   - Try a different `--tld` option

3. **"Permission denied"**
   - Ensure the `public/assets/audio/` directory is writable
   - Run with appropriate permissions

### Debug Mode

Add verbose logging to see what's happening:

```bash
python scripts/generate_audio.py --post-id Pilivesha
```

The script provides emoji-rich progress updates:
- 🎯 Starting generation
- 📖 Reading blog data
- 🎬 Processing each post
- ✅ Successfully saved
- ❌ Error occurred

## 🚀 Automation Ideas

### GitHub Actions

You could automate this with GitHub Actions to generate audio on content updates:

```yaml
name: Generate Audio
on:
  push:
    paths: ['src/lib/blogData.ts']
jobs:
  generate-audio:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Generate Audio
        run: |
          pip install gtts
          python scripts/generate_audio.py
      - name: Commit Audio Files
        run: |
          git add public/assets/audio/
          git commit -m "Auto-generate audio files"
          git push
```

### Local Development

Add to your package.json:

```json
{
  "scripts": {
    "generate-audio": "python scripts/generate_audio.py",
    "audio:force": "python scripts/generate_audio.py --force"
  }
}
```

## 📈 Benefits Over Browser TTS

1. **👂 Better Voice Quality**: Google's cloud TTS vs basic browser voices
2. **🌐 Consistent Experience**: Same voice across all browsers/devices
3. **⚡ Faster Loading**: Pre-generated files load instantly
4. **📱 Mobile Friendly**: Works perfectly on all mobile devices
5. **🔄 Caching**: Audio files can be cached by CDNs

## 🎉 Result

Your blog will now have beautiful, natural-sounding audio narration that enhances accessibility and user experience! The generated MP3 files provide a much more professional and pleasant listening experience compared to robotic browser voices.
