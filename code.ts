figma.showUI(__html__);

type PulseReaction = {x: number, y: number, emoji: string};

let pulseData: PulseReaction[] = JSON.parse(figma.root.getPluginData("pulsedata") || "[]");

const loadExisting = async ()=>{
  const nodes: SceneNode[] = [];

  for (const reaction of pulseData){
    const note = figma.createSticky();
    note.x = reaction.x;
    note.y = reaction.y;
    await figma.loadFontAsync(note.text.fontName as FontName)
    note.text.characters = reaction.emoji;
    figma.currentPage.appendChild(note);
    nodes.push(note)
  }
  figma.viewport.scrollAndZoomIntoView(nodes);
}

figma.ui.onmessage =  async (msg: {type: string, count: number, value: any}) => {
  if (msg.type === 'result') {
    const nodes: SceneNode[] = [];

    let newReaction: PulseReaction = {
      x: Math.random() * 500, 
      y: Math.random() * 500, 
      emoji: msg.value
    };

    pulseData.push(newReaction);
    figma.root.setPluginData("pulsedata", JSON.stringify(pulseData));

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

loadExisting();