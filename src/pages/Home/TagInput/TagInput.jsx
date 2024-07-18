import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

function TagsInput() {
  //   console.log(cities);
  const [tags, setTags] = useState([]);

  const handleTagDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleTagAddition = (tag) => {
    setTags([...tags, tag]);
  };

  return (
    <div className="tags-input">
      <ReactTags
        tags={tags}
        handleDelete={handleTagDelete}
        handleAddition={handleTagAddition}
        placeholder="Enter tags"
      />
    </div>
  );
}

export default TagsInput;
