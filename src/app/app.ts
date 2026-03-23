import { ChangeDetectionStrategy, Component, signal, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { animate, stagger, inView } from "motion";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  isMenuOpen = signal(false);
  
  skills = [
    { name: 'Angular', icon: 'code' },
    { name: 'TypeScript', icon: 'terminal' },
    { name: 'Tailwind CSS', icon: 'palette' },
    { name: 'Node.js', icon: 'dns' },
    { name: 'Firebase', icon: 'cloud' },
    { name: 'UI/UX Design', icon: 'auto_awesome' },
  ];

  projects = [
    {
      title: 'Crypto Dashboard',
      description: 'Real-time cryptocurrency tracking with advanced charting.',
      image: 'https://picsum.photos/seed/crypto/800/600',
      tags: ['Angular', 'D3.js', 'Tailwind'],
      link: '#'
    },
    {
      title: 'AI Image Generator',
      description: 'Generate stunning visuals using stable diffusion models.',
      image: 'https://picsum.photos/seed/ai/800/600',
      tags: ['React', 'Python', 'OpenAI'],
      link: '#'
    },
    {
      title: 'E-commerce Platform',
      description: 'A high-performance online store with seamless checkout.',
      image: 'https://picsum.photos/seed/shop/800/600',
      tags: ['Next.js', 'Stripe', 'PostgreSQL'],
      link: '#'
    },
    {
      title: 'Social Media App',
      description: 'Real-time messaging and content sharing platform.',
      image: 'https://picsum.photos/seed/social/800/600',
      tags: ['Angular', 'Firebase', 'Motion'],
      link: '#'
    }
  ];

  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Hero Animations
      animate(
        ".hero-title",
        { opacity: [0, 1], y: [50, 0] },
        { duration: 1, ease: [0.22, 1, 0.36, 1] }
      );
      
      animate(
        ".hero-sub",
        { opacity: [0, 1], y: [30, 0] },
        { duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
      );

      // Scroll Animations
      inView(".reveal", (element) => {
        animate(
          element,
          { opacity: [0, 1], y: [40, 0] },
          { duration: 0.8, ease: "easeOut" }
        );
      });

      inView(".skill-card", (element) => {
        animate(
          element,
          { opacity: [0, 1], scale: [0.9, 1] },
          { duration: 0.5, delay: stagger(0.1) }
        );
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  scrollTo(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        this.isMenuOpen.set(false);
      }
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      if (isPlatformBrowser(this.platformId)) {
        alert('Message sent successfully! (Demo only)');
      }
      this.contactForm.reset();
    }
  }
}
