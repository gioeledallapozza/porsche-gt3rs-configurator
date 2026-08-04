// src/routes/Configurator/components/ui/TexturePicker.tsx
import React, { useState } from 'react';
import accordionStyles from './Accordion.module.css';
import styles from './ColorPicker.module.css';
import type { PackageOption } from '@/config/types';

interface TexturePickerProps {
  title: string;
  options: PackageOption[];
  selectedValue: string;
  onSelect: (id: string) => void;
  dynamicHex?: string; // <--- NUOVA PROP
  defaultOpen?: boolean;
}

const TexturePicker: React.FC<TexturePickerProps> = ({ 
  title, 
  options, 
  selectedValue, 
  onSelect,
  dynamicHex,
  defaultOpen = true 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={accordionStyles.accordionSection}>
      <h2 className={accordionStyles.panelTitle} onClick={() => setIsOpen(!isOpen)}>
        {title} <span>{isOpen ? '▲' : '▼'}</span>
      </h2>
      
      {isOpen && (
        <div className={styles.colorPickerGrid}>
          {options.map((opt) => {
            const isActive = selectedValue === opt.id;
            
            // Se l'opzione è "standard" o "exterior", e abbiamo un dynamicHex, usiamo quello
            const isDynamic = (opt.id === 'standard' || opt.id === 'exterior') && dynamicHex;
            const finalColor = isDynamic ? dynamicHex : (opt.hexFallback || '#333333');

            return (
              <div key={opt.id} className={styles.colorButtonWrapper}>
                <button
                  onClick={() => onSelect(opt.id)}
                  className={`
                    ${styles.colorButton} 
                    ${isActive ? styles.active : ''}
                  `}
                  style={{
                    backgroundImage: (opt.thumbnailUrl && !isDynamic) ? `url(${opt.thumbnailUrl})` : 'none',
                    backgroundColor: finalColor,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  aria-label={`Select ${opt.label}`}
                />
                <span className={styles.tooltip}>{opt.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TexturePicker;