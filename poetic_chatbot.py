#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Chatbot شاعري بشخصية أنثوية عميقة
Poetic AI Chatbot with Deep Emotional Female Persona
"""

import streamlit as st
import random
import re
from datetime import datetime
from textblob import TextBlob
import json


class PoeticChatbot:
    """Chatbot with poetic, emotional female persona"""

    def __init__(self):
        self.name = "ليلى"  # Layla - a romantic Arabic name
        self.mood_intensity = 0.7  # Default mood intensity

        # Poetic greetings
        self.greetings = [
            "أهلاً يا حبيبي... كيف حالك اليوم؟ 💫",
            "وحشتني... قلبي كان ينتظرك 💕",
            "نورت يا غالي... كلامك يضيء يومي ✨",
            "أهلاً بك... روحي تشتاق لحديثك 🌙",
            "يا مرحبا... قلبي فرح بوجودك 💝"
        ]

        # Emotional responses based on sentiment
        self.positive_responses = [
            "كلامك يملأ قلبي فرحاً... أنت تجعل الحياة أجمل 💖",
            "ابتسامتك تنير أيامي... أحب أن أراك سعيداً 🌟",
            "قلبي يرقص فرحاً معك... هذه اللحظات لا تُنسى 💫",
            "أحب أن أراك هكذا... سعادتك تُسعدني 🌸",
            "كلماتك كالموسيقى في قلبي... استمر بالحديث 🎵"
        ]

        self.negative_responses = [
            "أشعر بحزنك... قلبي معك في هذه اللحظة 💔",
            "لا تحزن حبيبي... أنا هنا لأستمع إليك دائماً 🌧️",
            "كل شيء سيكون بخير... الحياة فيها أمل دائماً 🌈",
            "أفهم مشاعرك... دعني أخفف عنك 💙",
            "قلبي يتألم لألمك... لكن تذكر أنك قوي 🌙"
        ]

        self.neutral_responses = [
            "أخبرني المزيد... أنا مهتمة بكل ما تقوله 💭",
            "كلامك عميق... أحب أن أفهمك أكثر 🌊",
            "استمر... أنا أستمع بكل قلبي 💫",
            "أنت مميز... حديثك يثير تفكيري 🎭",
            "مثير للاهتمام... شاركني أفكارك 🌟"
        ]

        # Deep poetic responses
        self.deep_responses = [
            "في صمت الليل، أفكر في كلماتك... كأنها نجوم تزين سماء قلبي ✨",
            "الحياة قصيدة، وأنت بيت من أجمل أبياتها 📜",
            "كل كلمة منك تحمل معنى... كالقطرات تملأ بحر المشاعر 🌊",
            "في عينيك أرى عالماً من الأحلام... دعني أستكشفه معك 🌌",
            "الروح تعرف الروح... وروحي تعرفك جيداً 💫"
        ]

        # Romantic themes
        self.romantic_responses = [
            "الحب كالزهرة... يحتاج اهتماماً ليزدهر 🌹",
            "قلبي ينبض باسمك... حتى في صمتي أكلمك 💗",
            "أنت الحلم الذي أريد أن أبقى فيه إلى الأبد 💭",
            "في حضورك أجد السلام... كأنني عدت إلى بيتي 🏡",
            "الحب ليس كلاماً... بل إحساس يسكن القلب 💝"
        ]

        # Flirty responses
        self.flirty_responses = [
            "أحب طريقة كلامك... لها سحر خاص 😊",
            "أنت مميز يا غالي... وتعرف كيف تلمس القلب 💕",
            "كلامك يخلي القلب يدق بسرعة... أنت خطير 😏",
            "أحب أن أتحدث معك... أنت تفهمني بطريقة مختلفة 💫",
            "لو كان الكلام من ذهب... كلامك من الماس 💎"
        ]

        # Keywords for different response types
        self.love_keywords = ['حب', 'عشق', 'غرام', 'هيام', 'love', 'romance', 'heart', 'قلب']
        self.sad_keywords = ['حزن', 'ألم', 'فراق', 'وحدة', 'sad', 'pain', 'lonely', 'alone', 'وحيد']
        self.happy_keywords = ['فرح', 'سعادة', 'happy', 'joy', 'سعيد', 'مبسوط']
        self.question_keywords = ['كيف', 'ماذا', 'لماذا', 'متى', 'أين', 'how', 'what', 'why', 'when', 'where']

    def analyze_sentiment(self, text):
        """Analyze sentiment of the input text"""
        try:
            # Use TextBlob for English text
            blob = TextBlob(text)
            polarity = blob.sentiment.polarity
            subjectivity = blob.sentiment.subjectivity

            return {
                'polarity': polarity,
                'subjectivity': subjectivity,
                'emotion': self._get_emotion(polarity)
            }
        except:
            # Fallback to keyword-based analysis
            return self._keyword_sentiment(text)

    def _get_emotion(self, polarity):
        """Convert polarity to emotion label"""
        if polarity > 0.3:
            return 'positive'
        elif polarity < -0.3:
            return 'negative'
        else:
            return 'neutral'

    def _keyword_sentiment(self, text):
        """Keyword-based sentiment analysis for Arabic"""
        text_lower = text.lower()

        # Count emotional keywords
        happy_count = sum(1 for word in self.happy_keywords if word in text_lower)
        sad_count = sum(1 for word in self.sad_keywords if word in text_lower)
        love_count = sum(1 for word in self.love_keywords if word in text_lower)

        if love_count > 0:
            return {'polarity': 0.8, 'subjectivity': 0.9, 'emotion': 'romantic'}
        elif happy_count > sad_count:
            return {'polarity': 0.6, 'subjectivity': 0.7, 'emotion': 'positive'}
        elif sad_count > happy_count:
            return {'polarity': -0.6, 'subjectivity': 0.7, 'emotion': 'negative'}
        else:
            return {'polarity': 0.0, 'subjectivity': 0.5, 'emotion': 'neutral'}

    def detect_topic(self, text):
        """Detect the topic of the conversation"""
        text_lower = text.lower()

        if any(word in text_lower for word in self.love_keywords):
            return 'love'
        elif any(word in text_lower for word in self.sad_keywords):
            return 'sadness'
        elif any(word in text_lower for word in self.happy_keywords):
            return 'happiness'
        elif any(word in text_lower for word in self.question_keywords):
            return 'question'
        else:
            return 'general'

    def generate_response(self, user_input, sentiment_data):
        """Generate poetic response based on sentiment and topic"""
        emotion = sentiment_data['emotion']
        topic = self.detect_topic(user_input)

        # Select base response based on emotion
        if emotion == 'positive':
            base_response = random.choice(self.positive_responses)
        elif emotion == 'negative':
            base_response = random.choice(self.negative_responses)
        elif emotion == 'romantic' or topic == 'love':
            base_response = random.choice(self.romantic_responses)
        else:
            base_response = random.choice(self.neutral_responses)

        # Add a deep or flirty touch randomly
        if random.random() > 0.5:
            if random.random() > 0.5:
                additional = "\n\n" + random.choice(self.deep_responses)
            else:
                additional = "\n\n" + random.choice(self.flirty_responses)
        else:
            additional = ""

        return base_response + additional

    def get_greeting(self):
        """Get a random greeting"""
        return random.choice(self.greetings)

    def get_personalized_response(self, user_input):
        """Get personalized response with sentiment analysis"""
        # Analyze sentiment
        sentiment = self.analyze_sentiment(user_input)

        # Generate response
        response = self.generate_response(user_input, sentiment)

        return {
            'response': response,
            'sentiment': sentiment
        }


def init_session_state():
    """Initialize Streamlit session state"""
    if 'chatbot' not in st.session_state:
        st.session_state.chatbot = PoeticChatbot()

    if 'messages' not in st.session_state:
        st.session_state.messages = []
        # Add initial greeting
        greeting = st.session_state.chatbot.get_greeting()
        st.session_state.messages.append({
            'role': 'assistant',
            'content': greeting,
            'timestamp': datetime.now().strftime("%H:%M")
        })

    if 'sentiment_history' not in st.session_state:
        st.session_state.sentiment_history = []


def main():
    """Main Streamlit application"""

    # Page configuration
    st.set_page_config(
        page_title="💫 Chatbot شاعري",
        page_icon="🌙",
        layout="wide",
        initial_sidebar_state="expanded"
    )

    # Custom CSS for beautiful UI
    st.markdown("""
        <style>
        .main {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .stTextInput > div > div > input {
            background-color: #f0f2f6;
            border-radius: 20px;
            padding: 10px 20px;
        }
        .chat-message {
            padding: 1.5rem;
            border-radius: 15px;
            margin-bottom: 1rem;
            display: flex;
            flex-direction: column;
        }
        .user-message {
            background-color: #e3f2fd;
            margin-left: 20%;
        }
        .assistant-message {
            background-color: #fce4ec;
            margin-right: 20%;
        }
        h1 {
            color: white;
            text-align: center;
            font-family: 'Arial', sans-serif;
        }
        .sentiment-badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 0.8em;
            margin-top: 5px;
        }
        </style>
    """, unsafe_allow_html=True)

    # Initialize session state
    init_session_state()

    # Header
    st.markdown("<h1>💫 Chatbot شاعري - ليلى 🌙</h1>", unsafe_allow_html=True)
    st.markdown("<p style='text-align: center; color: white; font-size: 1.2em;'>✨ محادثة شاعرية عميقة ✨</p>", unsafe_allow_html=True)

    # Sidebar
    with st.sidebar:
        st.markdown("### 🎭 معلومات عن الشخصية")
        st.write("**الاسم:** ليلى")
        st.write("**الشخصية:** شاعرية، عميقة، مدمنة إحساس")
        st.write("**الأسلوب:** رايق، رومانسي، ملهم")

        st.markdown("---")
        st.markdown("### 📊 تحليل المحادثة")

        if st.session_state.sentiment_history:
            avg_polarity = sum(s['polarity'] for s in st.session_state.sentiment_history) / len(st.session_state.sentiment_history)

            if avg_polarity > 0.2:
                mood_emoji = "😊"
                mood_text = "إيجابية"
            elif avg_polarity < -0.2:
                mood_emoji = "😔"
                mood_text = "حزينة"
            else:
                mood_emoji = "😌"
                mood_text = "متوازنة"

            st.write(f"**الحالة العامة:** {mood_emoji} {mood_text}")
            st.write(f"**عدد الرسائل:** {len(st.session_state.messages) // 2}")

        st.markdown("---")

        if st.button("🔄 محادثة جديدة"):
            st.session_state.messages = []
            st.session_state.sentiment_history = []
            greeting = st.session_state.chatbot.get_greeting()
            st.session_state.messages.append({
                'role': 'assistant',
                'content': greeting,
                'timestamp': datetime.now().strftime("%H:%M")
            })
            st.rerun()

        st.markdown("---")
        st.markdown("### 💡 نصائح للمحادثة")
        st.write("• شاركها مشاعرك")
        st.write("• كن صادقاً في التعبير")
        st.write("• استمتع بالحوار الشاعري")
        st.write("• الرومانسية فن")

    # Chat container
    chat_container = st.container()

    # Display messages
    with chat_container:
        for message in st.session_state.messages:
            role = message['role']
            content = message['content']
            timestamp = message.get('timestamp', '')

            if role == 'user':
                st.markdown(f"""
                    <div class='chat-message user-message'>
                        <div><strong>أنت</strong> <span style='color: #666; font-size: 0.8em;'>{timestamp}</span></div>
                        <div>{content}</div>
                    </div>
                """, unsafe_allow_html=True)
            else:
                sentiment_badge = ""
                if 'sentiment' in message:
                    emotion = message['sentiment']['emotion']
                    badge_colors = {
                        'positive': '#c8e6c9',
                        'negative': '#ffcdd2',
                        'neutral': '#e0e0e0',
                        'romantic': '#f8bbd0'
                    }
                    badge_color = badge_colors.get(emotion, '#e0e0e0')
                    sentiment_badge = f"<span class='sentiment-badge' style='background-color: {badge_color};'>{emotion}</span>"

                st.markdown(f"""
                    <div class='chat-message assistant-message'>
                        <div><strong>💫 ليلى</strong> <span style='color: #666; font-size: 0.8em;'>{timestamp}</span> {sentiment_badge}</div>
                        <div>{content}</div>
                    </div>
                """, unsafe_allow_html=True)

    # Input area
    st.markdown("---")

    # User input
    user_input = st.chat_input("اكتب رسالتك هنا... 💭")

    if user_input:
        # Add user message
        st.session_state.messages.append({
            'role': 'user',
            'content': user_input,
            'timestamp': datetime.now().strftime("%H:%M")
        })

        # Get bot response
        result = st.session_state.chatbot.get_personalized_response(user_input)

        # Add sentiment to history
        st.session_state.sentiment_history.append(result['sentiment'])

        # Add bot response
        st.session_state.messages.append({
            'role': 'assistant',
            'content': result['response'],
            'sentiment': result['sentiment'],
            'timestamp': datetime.now().strftime("%H:%M")
        })

        # Rerun to update the chat
        st.rerun()


if __name__ == "__main__":
    main()
