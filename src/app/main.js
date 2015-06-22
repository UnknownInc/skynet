import "modernizr";
import $ from "jquery";
import {Typer} from "./components/typer";
import {ScrollLocker} from "./components/scrolllock";
import {Sizer} from "./components/sizer";

export class App {
  constructor(){
  }


  start(){
 
    let scrollLocker=new ScrollLocker();

    scrollLocker.activate($('#pagenav'));

    let sizer = new Sizer();
    sizer.activate($('#sidebar'));

    this.overlay=$('#overlay');
    //this.showIntro();
    this.hideOverlay();
  }

  showIntro(){
    let introTyper = new Typer('Hello Human...');

    var typeLocation=$('<h1 class="center"></h1>');
    this.overlay.append(typeLocation);
    this.overlay.addClass('opaque');
    this.overlay.fadeIn();

    introTyper.activate(typeLocation)
      .then(()=>this.hideOverlay());
  }

  hideOverlay(){
    this.overlay.html('');
    this.overlay.fadeOut(500 , 
      () =>this.overlay.removeClass('opaque'));
  }
}
