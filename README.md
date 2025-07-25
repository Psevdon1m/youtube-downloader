# YouTube Downloader

A cross-platform desktop application for downloading YouTube videos in various formats, built with Electron, Vue 3, and yt-dlp.

## Features

- Download YouTube videos in multiple formats (audio/video)
- Select from available video/audio formats before downloading
- Simple, modern UI
- Cross-platform: Windows, macOS, and Linux

## Technologies Used

- **Electron**: For building the desktop application shell and handling native OS integration.
- **Vue 3**: For building the user interface (UI) with a reactive, component-based architecture.
- **Pinia**: State management for Vue 3.
- **yt-dlp**: A powerful command-line program to download videos from YouTube and other sites (used via Node.js bindings).
- **ffmpeg-static**: Provides a static ffmpeg binary for video/audio processing and merging.
- **TypeScript**: For type safety and improved developer experience.

## Basic Functionality

1. **Paste YouTube URL**: Enter a valid YouTube video link in the input field.
2. **Fetch Formats**: The app fetches available video and audio formats for the provided URL.
3. **Select Format**: Choose your preferred video/audio format from the list.
4. **Download**: Click the download button to save the video/audio to your system's Downloads folder.

## Project Structure

- `src/electron/`: Electron main process and backend logic (yt-dlp integration).
- `src/preload/`: Preload scripts for secure communication between Electron and the UI.
- `src/ui/`: Vue 3 frontend (UI components, pages, and logic).

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the app in development mode:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run package-mac:full
   ```

## License

This project is for educational and personal use only. Please respect YouTube's Terms of Service when downloading content.
