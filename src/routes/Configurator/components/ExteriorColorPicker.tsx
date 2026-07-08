import React, { useState } from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import type { PaintOption } from '@/config/types.ts';
import styles from '../Configurator.module.css';

interface ExteriorColorPickerProps {
  paintOptions: PaintOption[];
}

const ExteriorColorPicker: React.FC<ExteriorColorPickerProps> = ({ paintOptions }) => {
  // Only this component re-renders when color changes
  const currentColor = useConfiguratorStore((state) => state.carColor);
  const setCarColor = useConfiguratorStore((state) => state.setCarColor);
  
  //Local state to manage the accordion section
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.accordionSection}>
      <h3 className={styles.panelTitle} onClick={() => setIsOpen(!isOpen)}>
        Exterior Colors <span>{isOpen ? '▲' : '▼'}</span>
      </h3>
      
      {/* ACCORDION CONTENT */}
      {isOpen && (
        <div className={styles.colorPickerGrid}>
          {paintOptions.map((paint) => (
            <button
              key={paint.hex}
              onClick={() => setCarColor(paint.hex)}
              title={paint.name}
              className={`${styles.colorButton} ${currentColor === paint.hex ? styles.active : ''}`}
              style={{ backgroundColor: paint.hex }}
              aria-label={`Select ${paint.name} paint`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExteriorColorPicker;