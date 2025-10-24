#!/bin/bash

# Setup script for Poetic Chatbot
# نص تثبيت Chatbot شاعري

echo "🌙 Setting up Poetic AI Chatbot..."
echo "جاري تثبيت Chatbot شاعري..."
echo ""

# Check Python version
echo "Checking Python version..."
python3 --version

# Install requirements
echo ""
echo "📦 Installing required packages..."
echo "جاري تثبيت المكتبات المطلوبة..."
pip install -r requirements.txt

# Download TextBlob corpora
echo ""
echo "📚 Downloading TextBlob language data..."
echo "جاري تحميل بيانات اللغة..."
python3 -m textblob.download_corpora

echo ""
echo "✅ Setup complete!"
echo "✅ التثبيت اكتمل!"
echo ""
echo "🚀 To run the chatbot, use:"
echo "لتشغيل البوت، استخدم:"
echo ""
echo "    streamlit run poetic_chatbot.py"
echo ""
echo "💫 Enjoy your poetic conversations! 🌙"
echo "💫 استمتع بمحادثاتك الشاعرية! 🌙"
