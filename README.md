# 120 Days – 70 Marks | Focus Timer 🎯

A sleek, responsive dark/light study focus timer and preparation tracker designed for GATE and competitive exam aspirants.

![Focus Timer Preview](index.html)

## ✨ Features

- **⏱ Semicircular Focus Timer**: Customizable Pomodoro / Deep Focus cycles with animated gradient ring, tick marks, and sound notifications.
- **📚 100% User-Defined Subjects & Time**: Zero pre-built dummy data or mock subjects. You add, track, and manage all your subjects and study time.
- **📅 Day, Week & Month Task Planner**: Add, edit ✏️, and delete 🗑️ tasks with target durations, dates, and subjects. Switch effortlessly between Day, Week, and Month views.
- **📝 Topic-wise & Subject-wise Mock Test Tracker**: Record mock test scores, total marks, time taken, and review notes for Topic-wise, Subject-wise, or Full-length tests with live performance analytics.
- **📊 Study Analytics Dashboard**:
  - Filter by Day, Week, or Month
  - Real subject split (interactive SVG pie chart)
  - 24h hourly activity & weekly/monthly trends
  - 28-day GitHub-style study streak heatmap
  - Manual study time logging (+ Log Time)
- **🎵 Ambient Study Sounds**: Built-in Lo-Fi beats, Rain 🌧, Café ☕, White Noise 🌊, and Fireplace 🔥 ambience.
- **🎧 Apple Music Integration**: Embed curated study playlists or paste your own custom Apple Music links.
- **🌌 Dynamic Aurora Background**: Reactive particle & aurora animation that intensifies during focus mode.
- **☁️ Supabase Cloud Sync & Authentication**: Sign Up and Log In with Supabase to automatically back up and sync your tasks, study logs, streak, mock tests, and settings across all your devices.
- **💾 Local-First & Offline Ready**: Works seamlessly offline without an account, saving to localStorage, and syncs automatically when logged in.
- **🌗 Dark / Light Theme Toggle**: Seamless transition with local persistence.
- **🔄 Clean Reset**: Option to reset all data to zero anytime.

## 🚀 Getting Started

Simply open `index.html` in any modern web browser:

```bash
# Clone the repository
git clone https://github.com/Pranit113/gate-focus-timer.git

# Navigate into the folder
cd gate-focus-timer

# Open index.html in your default browser
```

No build tools, npm packages, or server required!

## ⚙️ Customization

Click the **⚙️ Gear Icon** on the timer to configure:
- Ring color gradients (Purple, Blue, Orange, Teal, Pink)
- Focus duration (5 to 240 minutes)
- Short & long break intervals
- Sessions before long break
- Target exam date

## ☁️ Cloud Sync (Supabase Setup)

To access your study logs and tasks across any device:
1. Create a free account and project at [Supabase](https://supabase.com).
2. In your Supabase project dashboard, navigate to **SQL Editor** and run:
   ```sql
   CREATE TABLE IF NOT EXISTS public.user_data (
     id uuid references auth.users on delete cascade primary key,
     data jsonb not null default '{}'::jsonb,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   ALTER TABLE public.user_data ENABLE ROW LEVEL SECURITY;

   DROP POLICY IF EXISTS "Users access own data" ON public.user_data;

   CREATE POLICY "Users access own data"
     ON public.user_data
     FOR ALL
     USING (auth.uid() = id)
     WITH CHECK (auth.uid() = id);
   ```
3. Open the app, click **☁️ Connect Cloud**, go to the **⚙️ Setup** tab, paste your **Project URL** and **Anon Key**, and click **Save**.
4. Create an account via **Sign Up** or log in via **Sign In**. Your data will now automatically sync to the cloud!

