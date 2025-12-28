#!/bin/bash

# Audio Generation Setup Script
# This script sets up the environment for generating MP3 audio files from blog posts

echo "🎯 Setting up audio generation for blog posts..."

# Create required directories
echo "📁 Creating directories..."
mkdir -p public/assets/audio
mkdir -p scripts

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
pip install -r scripts/requirements.txt

echo "✅ Setup complete!"
echo ""
echo "📖 Usage Instructions:"
echo ""
echo "1. Generate audio for all blog posts:"
echo "   python scripts/generate_audio.py"
echo ""
echo "2. Generate audio for a specific post:"
echo "   python scripts/generate_audio.py --post-id Pilivesha"
echo ""
echo "3. Use a different voice (e.g., British English):"
echo "   python scripts/generate_audio.py --tld co.uk"
echo ""
echo "4. Generate slower speech:"
echo "   python scripts/generate_audio.py --slow"
echo ""
echo "5. Force regenerate existing files:"
echo "   python scripts/generate_audio.py --force"
echo ""
echo "🎵 Audio files will be saved to: public/assets/audio/"
echo "🌐 They will be accessible at: /assets/audio/{post-id}.mp3"
