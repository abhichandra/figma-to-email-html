# Figma to Email HTML Converter

This Node.js app connects to the Figma API, reads basic TEXT and RECTANGLE layers, and outputs responsive email-compatible HTML using `<table>` and inline CSS.

## 🔧 Setup

1. Clone this repo
2. Run `npm install`
3. Add `.env` with your Figma token
4. Start server: `npm start`

## 🌐 API Usage

```
GET /figma/html?fileKey=YOUR_FIGMA_FILE_KEY
```

## 🧠 Future Enhancements

- Parse text styles (color, size)
- Handle layout positioning
- Extract images
- UI for HTML preview
