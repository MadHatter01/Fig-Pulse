figma.showUI(__html__);
figma.ui.onmessage =  async (msg: {type: string, count: number, value: any}) => {
  if (msg.type === 'result') {
    const nodes: SceneNode[] = [];
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
