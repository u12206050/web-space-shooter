const RAD = Math.PI/180
const WIDTH = 600
const HEIGHT = 800
const SIZE = 20
const SPACE = $('#space')

class Shot {
    impact = false
    $shot = $('<div class="shot"></div>')

    constructor(sX, sY, hs, vs) {
        console.log(arguments)
        this.hs = hs
        this.vs = vs

        this.x = sX
        this.y = sY

        this.update()

        SPACE.append(this.$shot)

        requestAnimationFrame(this.run.bind(this))
    }

    update() {
        this.$shot.css({
            left: this.x + 'px',
            top: this.y + 'px'
        });        
    }

    run() {
        if (this.impact) return

        if (this.x > WIDTH) this.x = 0
        else if (this.x < 0) this.x = WIDTH

        if (this.y > HEIGHT) this.y = 0
        else if (this.y < 0) this.y = HEIGHT

        this.x += this.hs
        this.y += this.vs

        this.update()

        requestAnimationFrame(this.run.bind(this))
    } 

    toggle() {
        this.$shot.style.background = "red"
    }
}


class Ship {
    x = 300
    y = 400
    vspeed = 0
    hspeed = 0
    angle = 270
    power = 1
    $ship = $('<div class="ship"></ship>')

    constructor() {
        this.update()

        SPACE.append(this.$ship)
    }

    update() {
        this.x += this.hspeed;
        this.y += this.vspeed;

        if (this.x > WIDTH) this.x = -SIZE
        else if (this.x < -SIZE) this.x = WIDTH

        if (this.y > HEIGHT) this.y = -SIZE
        else if (this.y < -SIZE) this.y = HEIGHT

        this.$ship.css({
            left: this.x + 'px',
            top: this.y + 'px',
            transform: `rotate(${this.angle - 45}deg)`
        })

        requestAnimationFrame(this.update.bind(this))
    }

    forward() {
        this.hspeed += Math.cos(RAD * this.angle) * -0.1
        this.vspeed += Math.sin(RAD * this.angle) * -0.1
    }

    backward() {
        this.hspeed -= Math.cos(RAD * this.angle) * -0.1
        this.vspeed -= Math.sin(RAD * this.angle) * -0.1
    }

    fire() {
        let hspeed = Math.cos(RAD * this.angle) * this.power * -1 + this.hspeed
        let vspeed = Math.sin(RAD * this.angle) * this.power * -1 + this.vspeed

        console.log(hspeed, vspeed)

        new Shot(this.x+10, this.y+10, hspeed, vspeed)
    }

    adjustAngle(a) {
        this.angle += a
    }
}



$(document).ready(function() {
    
    const sh = new Ship();

    $(document).keyup(function(e) {
        switch(e.which) {
            case 37: 
            case 39: 
            break;
        }
    });

    $(document).keydown(function(e) {
        switch(e.which) {
            case 32: /* space */
                sh.fire()
            break;
            case 37: /* left */
                sh.adjustAngle(-10)
            break;
            case 38: /* up */
                sh.forward()
            break;

            case 39: /* right */
                sh.adjustAngle(10)
            break;

            case 40: /* down */
                sh.backward()
            break;

            default: return; /* exit this handler for other keys */
        }
        e.preventDefault(); /* prevent the default action (scroll / move caret) */
    });
});