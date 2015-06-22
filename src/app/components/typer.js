import {Component} from "./component";

function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

export class Typer extends Component {
  constructor(text2type, options){
    super();
    var opts=options||{};
    this.text2type = text2type;
    this.binkRate = opts.binkRate||2000;
    this.initialDelay = opts.initialDelay||1000;
    this.typeRate = opts.typeRate||120;
  }

  typeNextChar(){
    $(this.spans[0]).text(this.text2type.substr(0,this.curIdx+1));
    if (this.curIdx!==(this.text2type.length-1)){
      var wait2nextchar=this.typeRate;
      if (this.text2type[this.curIdx]===' '){
        wait2nextchar*=2;
      }
      this.curIdx+=1;
      timeout(wait2nextchar)
        .then(()=>this.typeNextChar());
    }
    else {
      clearInterval(this.cursorTimer);
      if (this.resolve){
        this.resolve();
      }
    }
  }

  activate(element){
    super.activate();
    $(element).html('<span></span><span>&#x258c;</span>');
    this.spans=$(element).find('span');
    var cursorSpan=$(this.spans[1]);
    this.curIdx=0;
    var cursorVisible=true;
    this.cursorTimer = setInterval(()=>{
      cursorVisible=cursorVisible?false:true;
      if (cursorVisible) {
        cursorSpan.css('opacity',1.0);
      } else {
        cursorSpan.css('opacity',0);
      }
    }, this.blinkRate);
    timeout(this.initialDelay)
      .then(()=>this.typeNextChar(this));
    var typer=this;
    return new Promise((resolve, reject) => {
      this.resolve=resolve;
    });
  }

  deactivate(element){
    super.deactivate();
  }
}
