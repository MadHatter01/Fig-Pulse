figma.showUI(__html__);
figma.ui.onmessage =  async (msg: {type: string, count: number, value: any}) => {
  if (msg.type === 'result') {
    const nodes: SceneNode[] = [];
    let pulsedata = JSON.parse(figma.root.getPluginData("pulsedata") || "[]");


    let newReaction = {
      x: Math.random() * 500, 
      y: Math.random() * 500, 
      emoji: msg.value
    };

    pulsedata.push(newReaction);
    figma.root.setPluginData("pulsedata", JSON.stringify(pulsedata));
    console.log(pulsedata)
    const note = figma.createSticky();
    await figma.loadFontAsync(note.text.fontName as FontName)
    note.text.characters = msg.value;
    figma.currentPage.appendChild(note)
    nodes.push(note)
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  // figma.closePlugin();
};
