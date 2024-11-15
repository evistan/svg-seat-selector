import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  onMouseOver(event: MouseEvent): void {
    const target = event.target as SVGElement;
    
    if (target && target.id.startsWith('fri')) {
      target.classList.add('hovered');
    }
  }

  onMouseOut(event: MouseEvent): void {
    const target = event.target as SVGElement;

    if (target && target.id.startsWith('fri')) {
      target.classList.remove('hovered');
    }
  }

  onClick(event: MouseEvent): void {
    const target = event.target as SVGElement;

    if (target && target.id.startsWith('fri')) {
      const parent = target.parentElement;
      const parentId = parent instanceof SVGElement && parent.id ? parent.id : 'No parent ID';

      console.log(`Clicked ID: ${target.id}, Parent ID: ${parentId}`);
      this.showToast(target.id, parentId); 
    }
  }

  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('rect, path');

    elements.forEach((element) => {
      const svgElement = element as SVGElement;

      if (svgElement.id.startsWith('fri')) {
        svgElement.setAttribute('data-bs-title', svgElement.id);
        svgElement.setAttribute('data-bs-toggle', 'tooltip');

        svgElement.addEventListener('mouseover', (event: Event) =>
          this.onMouseOver(event as MouseEvent)
        );
        svgElement.addEventListener('mouseout', (event: Event) =>
          this.onMouseOut(event as MouseEvent)
        );
        svgElement.addEventListener('click', (event: Event) =>
          this.onClick(event as MouseEvent)
        );
      }
    });

    // Bootstrap init for tooltip
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  showToast(content: string, parentId: string): void {
    const toastElement = document.getElementById('toast-01') as HTMLElement;
    const toastBody = toastElement.querySelector('.toast-body');

    if (toastBody) {
      toastBody.innerHTML = `You chose seat with ID: <strong>${content}</strong><br>Parent ID: <strong>${parentId}</strong>`;
    }

    const toast = new (window as any).bootstrap.Toast(toastElement);
    toast.show();
  }
}
