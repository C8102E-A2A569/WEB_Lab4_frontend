import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HitsService} from "../../services/hits.service";
import {RadiusService} from "../../services/radius.service";

@Component({
  selector: 'app-coordinates-form',
  templateUrl: './coordinates-form.component.html',
  styleUrls: ['./coordinates-form.component.css']
})
export class CoordinatesFormComponent {
  coordinates = {
    x: '0',
    y: '',
    r: '1'
  };

xOptions  = [
    {
      idX:1,
      optionX:'-4',
      checked: false
    },
    {
      idX:2,
      optionX:'-3',
      checked: false
    },
    {
      idX:3,
      optionX:'-2',
      checked: false
    },
    {
      idX:4,
      optionX:'-1',
      checked: false
    },
    {
      idX:5,
      optionX:'0',
      checked: false
    },
    {
      idX:6,
      optionX:'1',
      checked: false
    },
    {
      idX:7,
      optionX:'2',
      checked: false
    },
    {
      idX:8,
      optionX:'3',
      checked: false
    },
    {
      idX:9,
      optionX:'4',
      checked: false
    }
   
  ];
  rOptions  = [
    {
      idR:1,
      optionR:'-4',
      checked: false
    },
    {
      idR:2,
      optionR:'-3',
      checked: false
    },
    {
      idR:3,
      optionR:'-2',
      checked: false
    },
    {
      idR:4,
      optionR:'-1',
      checked: false
    },
    {
      idR:5,
      optionR:'0',
      checked: false
    },
    {
      idR:6,
      optionR:'1',
      checked: false
    },
    {
      idR:7,
      optionR:'2',
      checked: false
    },
    {
      idR:8,
      optionR:'3',
      checked: false
    },
    {
      idR:9,
      optionR:'4',
      checked: false
    }
   
  ];

  constructor(private http: HttpClient,
              private hitsService: HitsService,
              private radiusService: RadiusService) {
  }

  isRPositive() {
    return parseFloat(this.rOptions.find(option => option.checked)?.optionR || '') > 0 ||  this.rOptions.filter(option => option.checked).length === 0;
  }

  onSubmit(coordinatesForm: NgForm) {
    const selectedOptionX = this.xOptions.find(option => option.checked)?.optionX;
    const selectedOptionR = this.rOptions.find(option => option.checked)?.optionR;

    if (coordinatesForm.valid && selectedOptionX && selectedOptionR) {
        this.coordinates.x = selectedOptionX;
        this.coordinates.r = selectedOptionR;

        if (this.isRPositive()) {
          this.onRadiusChange(this.coordinates.r);
            this.hitsService.addHit(this.coordinates).subscribe({
                next: (result) => {
                    console.log('Hit added:', result);
                },
                error: (error) => {
                    console.error('Error adding hit:', error);
                }
            });
        } else {
            console.log('R should be positive.');
        }
    } else {
        console.log('Please select both X and R values.');
    }
}

  onClear() {
    this.hitsService.clearHits().subscribe({
      next: (result) => {
        console.log('Hits cleared:', result);
      },
      error: (error) => {
        console.error('Error clearing hits:', error);
      }
    });
  }

  onRadiusChange(selectedRadius: string) {
    this.coordinates.r = selectedRadius;
    let newRadiusValue = parseFloat(selectedRadius);
    this.radiusService.radius = newRadiusValue;
  }

}
