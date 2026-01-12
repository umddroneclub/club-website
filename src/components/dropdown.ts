export function linkTriggerDropdownScript(dropdown_class: string, button_class: string, content_class: string) {
  const dropdowns = document.querySelectorAll(dropdown_class);

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector(button_class);
    const content = dropdown.querySelector(content_class);

    if (!trigger || !content) return;

    // open and don't close immediately on open
    trigger.addEventListener('click', (e) => {
      e.stopPropagation(); 
      closeAllDropdownsExcept(dropdown);

      const pe = e as PointerEvent;

      if (pe.pointerType !== 'mouse') {
        if (!dropdown.classList.contains('open')) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      } else {
        dropdown.classList.toggle('open');
      }
    });

    // Clicking inside should not close it
    content.addEventListener('click', (e) => {
      e.stopPropagation(); 
    });
  });

  // Close all dropdowns on outside click
  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('open'));
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach(d => d.classList.remove('open'));
    }
  });

  function closeAllDropdownsExcept(current: Element) {
    dropdowns.forEach(d => {
      if (d !== current) d.classList.remove('open');
    });
  }
}

export function simpleDropdownScript(dropdown_class: string, button_class: string, content_class: string) {
  const dropdowns = document.querySelectorAll(dropdown_class);

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector(button_class);
    const content = dropdown.querySelector(content_class);

    if (!trigger || !content) return;

    // open and don't close immediately on open
    trigger.addEventListener('click', (e) => {
      e.stopPropagation(); 
      closeAllDropdownsExcept(dropdown);

      const pe = e as PointerEvent;

      if (pe.pointerType !== 'mouse') {
        dropdown.classList.toggle('open');
      }
    });

    // Clicking inside should not close it
    content.addEventListener('click', (e) => {
      e.stopPropagation(); 
    });
  });

  // Close all dropdowns on outside click
  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('open'));
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach(d => d.classList.remove('open'));
    }
  });

  function closeAllDropdownsExcept(current: Element) {
    dropdowns.forEach(d => {
      if (d !== current) d.classList.remove('open');
    });
  }
}

export function selectorDropdownScript(selector_class: string, display_text_class: string, content_list_class: string, hidden_selector_class: string) {
  const selectorDropdowns = document.querySelectorAll(selector_class);

  selectorDropdowns.forEach(dropdown => {
    const triggerText = dropdown.querySelector(`${display_text_class} p`) as HTMLInputElement;
    const trigger = dropdown.querySelector(display_text_class) as HTMLInputElement;
    const content = dropdown.querySelectorAll(content_list_class);
    const hiddenInput = dropdown.querySelector(hidden_selector_class) as HTMLInputElement;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation(); 
      closeAllDropdownsExcept(dropdown);

      const pe = e as PointerEvent;

      if (pe.pointerType !== 'mouse') {
        dropdown.classList.toggle('open');
      }
    });

    content.forEach(option => {
      option.addEventListener('click', (e) => {
        const value = option.getAttribute('data-value')!;
        triggerText.textContent = option.textContent;
        hiddenInput.value = value;
        hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
        dropdown.classList.remove('open');

        // hide only selected option
        content.forEach(opt => opt.classList.remove('hidden'));
        option.classList.add('hidden');
      });
    });
  });

  // Close all dropdowns on outside click
  document.addEventListener('click', () => {
    selectorDropdowns.forEach(d => d.classList.remove('open'));
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      selectorDropdowns.forEach(d => d.classList.remove('open'));
    }
  });

  function closeAllDropdownsExcept(current: Element) {
    selectorDropdowns.forEach(d => {
      if (d !== current) d.classList.remove('open');
    });
  }
}