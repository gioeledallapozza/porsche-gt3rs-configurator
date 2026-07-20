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

  const solidColors = options.filter((opt) => opt.finish === 'solid');
  const metallicColors = options.filter((opt) => opt.finish === 'metallic');
  const specialColors = options.filter((opt) => opt.finish === 'special');

  //Internal Helper for not repating the JSX on the grid
  const renderColorGroup = (groupTitle: string, colors: PaintOption[]) => {
    if (colors.length === 0) return null;
    
    return (
      <div className={styles.colorGroup}>
        <h4 className={styles.subPanelTitle}>{groupTitle}</h4>
        <div className={styles.colorPickerGrid}>
          {colors.map((paint) => (
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
      </div>
    );
  };

 return (
    <div className={styles.accordionSection}>
      <h2 className={styles.panelTitle} onClick={() => setIsOpen(!isOpen)}>
        {title} <span>{isOpen ? '▲' : '▼'}</span>
      </h2>
      
      {isOpen && (
        <>
          {renderColorGroup('Solid', solidColors)}
          {renderColorGroup('Metallic', metallicColors)}
          {renderColorGroup('Special', specialColors)}
        </>
      )}
    </div>
  );
};

export default ColorPicker;