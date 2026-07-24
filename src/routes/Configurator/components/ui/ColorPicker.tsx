import React, { useState } from 'react';
import type { PaintOption } from '@/config/types';
import accordionStyles from './Accordion.module.css';
import styles from './ColorPicker.module.css';

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
  const [activeTab, setActiveTab] = useState<'core' | 'bespoke'>('core');

  // Filter all colors in categories
  const standardOptions = options.filter(opt => opt.category !== 'pts');
  const bespokeOptions = options.filter(opt => opt.category === 'pts');

  const solidColors = standardOptions.filter((opt) => opt.finish === 'solid');
  const metallicColors = standardOptions.filter((opt) => opt.finish === 'metallic');
  const specialColors = standardOptions.filter((opt) => opt.finish === 'special');

  const renderColorGrid = (colors: PaintOption[]) => {
    return (
      <div className={styles.colorPickerGrid}>
        {colors.map((paint) => {
          const isMetallic = paint.finish === 'metallic' || paint.finish === 'special';
          const isActive = selectedValue === paint.hex;

          return (
            <div key={paint.hex} className={styles.colorButtonWrapper}>
              <button
                onClick={() => onSelect(paint.hex)}
                className={`
                  ${styles.colorButton} //Always present
                  ${isActive ? styles.active : ''} //Add active class if selected
                  ${isMetallic ? styles.metallicFlakes : ''} //Apply flakes only if metallic
                `}
                style={{ backgroundColor: paint.hex }} //Dynamic backcolor
                aria-label={`Select ${paint.name}`}
              />
              <span className={styles.tooltip}>{paint.name}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={accordionStyles.accordionSection}>
      <h2 className={accordionStyles.panelTitle} onClick={() => setIsOpen(!isOpen)}>
        {title} <span>{isOpen ? '▲' : '▼'}</span>
      </h2>
      
      {isOpen && (
        <div className={styles.panelContent}>
          
          {/* TOGGLE SWITCH CUSTOM */}
          {bespokeOptions.length > 0 && (
            <div className={styles.tabContainer}>
              <button 
                className={`${styles.tabButton} ${activeTab === 'core' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('core')}
              >
                Core Palette
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'bespoke' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('bespoke')}
              >
                Bespoke ({bespokeOptions.length})
              </button>
            </div>
          )}

          {/* CORE VIEW */}
          {activeTab === 'core' && (
            <div className={styles.tabView}>
              {solidColors.length > 0 && (
                <div className={styles.colorGroup}>
                  <h4 className={styles.subPanelTitle}>Solid</h4>
                  {renderColorGrid(solidColors)}
                </div>
              )}
              {metallicColors.length > 0 && (
                <div className={styles.colorGroup}>
                  <h4 className={styles.subPanelTitle}>Metallic</h4>
                  {renderColorGrid(metallicColors)}
                </div>
              )}
              {specialColors.length > 0 && (
                <div className={styles.colorGroup}>
                  <h4 className={styles.subPanelTitle}>Special</h4>
                  {renderColorGrid(specialColors)}
                </div>
              )}
            </div>
          )}

          {/* BESPOKE VIEW */}
          {activeTab === 'bespoke' && (
            <div className={`${styles.tabView} ${styles.bespokeGridContainer}`}>
               <p className={styles.bespokeDescription}>
                An exclusive collection of historic and bespoke paints.
                </p>
               {renderColorGrid(bespokeOptions)}
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default ColorPicker;