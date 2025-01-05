import React, { useState } from 'react';

const ClipboardReader = () => {
  const [clipboardData, setClipboardData] = useState([]);

  const readClipboard = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      const data = [];

      for (const item of clipboardItems) {
        // Check for text data
        if (item.types.includes('text/plain')) {
          const text = await item.getType('text/plain');
          const textData = await text.text();
          data.push({ type: 'text', content: textData });
        }

        else{
          return
        }

        // Check for image data
        if (item.types.includes('image/png')) {
          const image = await item.getType('image/png');
          const imageData = await image.blob();
          data.push({ type: 'image', content: URL.createObjectURL(imageData) });
        }
      }

      setClipboardData(data);
      console.log('Clipboard content:', data);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  return (
    <div>
      <button onClick={readClipboard}>Read Clipboard</button>
      <div>
        {clipboardData.map((item, index) => (
          <div key={index}>
            {item.type === 'text' && <div><p>{item.content}</p><br /></div>}
            {item.type !=="text"  && <div>item type: <p>{item.type}</p></div>}
            {item.type === 'image' && <div><img src={item.content} alt="Clipboard content" /><br /></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClipboardReader;
