import { Component, Input } from '@angular/core';
import { DisplayImageService } from './display-image.service';

@Component({
  selector: 'app-display-profile-pic',
  templateUrl: './display-profile-pic.component.html',
  styleUrls: ['./display-profile-pic.component.css'],
})
export class DisplayProfilePicComponent {
  imageBlob?: Blob | null = null;
  previewSignsrc: string | null = null;
  @Input() imageFileName: string | null = null;

  constructor(private displayImageService: DisplayImageService) {
    if (this.imageFileName)
      displayImageService.getImage(this.imageFileName).subscribe({
        next: (response) => {
          if (!response) return;
          const imageUrl = URL.createObjectURL(response);
          const imgElement = document.getElementById(
            'my-image'
          ) as HTMLImageElement;
          imgElement.src = imageUrl;
        },
      });
  }
}
