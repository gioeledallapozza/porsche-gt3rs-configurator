import React, { useState } from 'react';
import type { PaintOption } from '@/config/types';
import styles from '../../Configurator.module.css';

interface ColorPickerProps {
  title: string;
  options: PaintOption[];
  selectedValue: string;
  onSelect: (hex: string) => void;
  defaultOpen?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  title, 
  options, 
  selectedValue, 
  onSelect,
  defaultOpen = true 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.accordionSection}>
      <h3 className={styles.panelTitle} onClick={() => setIsOpen(!isOpen)}>
        {title} <span>{isOpen ? '▲' : '▼'}</span>
      </h3>
      
      {isOpen && (
        <div className={styles.colorPickerGrid}>
          {options.map((paint) => (
            <button
              key={paint.hex}
              onClick={() => onSelect(paint.hex)}
              title={paint.name}
              className={`${styles.colorButton} ${selectedValue === paint.hex ? styles.active : ''}`}
              style={{ backgroundColor: paint.hex }}
              aria-label={`Select ${paint.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;