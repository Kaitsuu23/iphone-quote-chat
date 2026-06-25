const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function iphoneQuotedChatIqc(text, chatTime, statusBarTime, bubbleColor, menuColor, textColor, fontName, signalName, apikey) {
  try {
    const response = await fetch('https://anabot.my.id/api/maker/iqc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "text": text,
        "chatTime": chatTime,
        "statusBarTime": statusBarTime,
        "bubbleColor": bubbleColor,
        "menuColor": menuColor,
        "textColor": textColor,
        "fontName": fontName,
        "signalName": signalName,
        "apikey": apikey
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    throw error;
  }
}

app.post('/api/iqc', async (req, res) => {
  try {
    const { text, chatTime, statusBarTime, bubbleColor, menuColor, textColor, fontName, signalName, apikey } = req.body;
    const result = await iphoneQuotedChatIqc(text, chatTime, statusBarTime, bubbleColor, menuColor, textColor, fontName, signalName, apikey);
    res.set('Content-Type', 'image/png');
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
