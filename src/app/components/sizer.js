import {Component} from "./component";
import $ from "jquery";

export class Sizer extends Component {
  constructor(options){
    super();
    System.import('app/components/sizer.css!');
    var opts=options||{};
    this.orientation=opts.orientation||'verticle';
  }

  startDrag(x,y){
    if (this.isDragging) return;
    this.isDragging=true;
    this.drag={};
    this.drag.sx=x;
    this.drag.sy=y;
    this.drag.lw=parseInt(this.leftElement.css('width'));
    this.drag.rw=parseInt(this.rightElement.css('width'));
    this.drag.tw=this.drag.lw+this.drag.rw;
  }

  doDrag(x,y) {
    if (!this.isDragging) return;
    this.drag.x=this.drag.sx-x;
    this.drag.y=this.drag.sy-y;
    this.leftElement.css('width',
      (100.0*(this.drag.lw-this.drag.x)/this.drag.tw) +'%');
    this.rightElement.css('width',
      (100.0*(this.drag.rw+this.drag.x)/this.drag.tw) +'%');
  }

  stopDrag(x,y){
    if (!this.isDragging) return;
    this.isDragging=false;
    this.drag.ex=x;
    this.drag.ey=y
    this.drag.x=this.drag.sx-x;
    this.drag.y=this.drag.sy-y;
    this.leftElement.css('width',
      (100.0*(this.drag.w-this.drag.x)/this.drag.tw) +'%');
    this.rightElement.css('width',
      (100.0*(this.drag.rw+this.drag.x)/this.drag.tw) +'%');
  }

  activate(element){
    super.activate();
    this.element=$(element);
    this.sizer=$('<div></div>');
    if (this.orientation=='verticle'){
      this.sizer.addClass('vsizer');
    }
    this.element.append(this.sizer);

    this.leftElement=this.element;
    this.rightElement=this.element.next();

    this.isDragging=false;
    var self=this;
    this.sizer.on('mousedown',md=>{
      self.startDrag(md.screenX, md.screenY);
      md.preventDefault();
      $(window).one('mouseup',mu=>{
        self.stopDrag(mu.screenX, mu.screenY);
        mu.preventDefault();
      });
    });

    
    $(window).on('mousemove',mm=>{
      this.doDrag(mm.screenX, mm.screenY);
      mm.preventDefault();
    });
    return this;
  }

  deactivate(){
    super.deactivate();
    this.element.remove(this.sizer);
    this.sizer=null;
    return this;
  }
}
