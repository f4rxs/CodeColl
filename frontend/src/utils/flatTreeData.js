export const flatTreeData = (files = []) => {
    const flatData = [];
    
    const traverse = (fileList, level = 0) => {
      fileList.forEach(file => {
        flatData.push({ ...file, level });
        if (file.children) {
          traverse(file.children, level + 1);
        }
      });
    };
  
    traverse(files);
    return flatData;
  };
  