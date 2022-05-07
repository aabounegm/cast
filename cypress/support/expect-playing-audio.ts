export const expectPlayingAudio = () => {
  return cy.get('audio').should((els) => {
    let audible = false;
    els.each((i, el) => {
      if (el.duration > 0 && !el.paused && !el.muted) {
        audible = true;
      }
    });
    expect(audible).to.be.true;
  });
};

export const expectNoPlayingAudio = () => {
  return cy.get('audio').should((els) => {
    let audible = false;
    els.each((i, el) => {
      if (el.duration > 0 && !el.paused && !el.muted) {
        audible = true;
      }
    });
    expect(audible).to.be.false;
  });
};
