import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

function MyEmojiPicker() {
  const [selectedEmoji, setSelectedEmoji] = useState<any>([]);

  console.log(selectedEmoji)
  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmoji([...selectedEmoji, emoji]);
  };
  
  return (
    <div>
      <EmojiPicker onEmojiClick={handleEmojiSelect} />
      {selectedEmoji.length && 
        <p  className='flex'>{selectedEmoji.map((emoji:any)=> (
          <p>
            {emoji.emoji}
            <input value={emoji.emoji}/>
          </p>
        ))}</p>
      
      }
    </div>
  );
}

export default MyEmojiPicker;
