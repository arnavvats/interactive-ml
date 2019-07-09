import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlotlyService {

  constructor() { }

  getOffsets(graphDiv) {
    const xaxis = graphDiv._fullLayout.xaxis;
    const yaxis = graphDiv._fullLayout.yaxis;
    const margin = graphDiv._fullLayout.margin;
    const offsets = graphDiv.getBoundingClientRect();

    // Calculate linear function to convert x coord
    const xy1 = graphDiv.layout.xaxis.range[0];
    const xy2 = graphDiv.layout.xaxis.range[1];
    const xx1 = offsets.left + margin.l;
    const xx2 = offsets.left + graphDiv.offsetWidth - margin.r;
    const mx = (xy2 - xy1) / (xx2 - xx1);
    const cx = -(mx * xx1) + xy1;

    // Calculate linear function to convert y coord
    const yy1 = graphDiv.layout.yaxis.range[0];
    const yy2 = graphDiv.layout.yaxis.range[1];
    const yx1 = offsets.top + graphDiv.offsetHeight - margin.b;
    const yx2 = offsets.top + margin.t;
    const my = (yy2 - yy1) / (yx2 - yx1);
    const cy = -(my * yx1) + yy1;
    return {mx, cx, my, cy, xy1, xy2, yy1,yy2};
  }
}
