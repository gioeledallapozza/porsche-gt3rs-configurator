import React, { useState } from 'react';
import accordionStyles from './Accordion.module.css';
import styles from './OptionSelector.module.css';
import type { PackageOption } from '@/config/types';

interface OptionSelectorProps {
  title: string;
  options: PackageOption[];
  selectedValue: string;
  onSelect: (id: string) => void;
  defaultOpen?: boolean;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({ 
  title, 
  options, 
  selectedValue, 
  onSelect,
  defaultOpen = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={accordionStyles.accordionSection}>
      <h3 className={accordionStyles.panelTitle} onClick={() => setIsOpen(!isOpen)}>
        {title} <span>{isOpen ? '▲' : '▼'}</span>
      </h3>
      
      {isOpen && (
        <div className={styles.optionGrid}>
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`${styles.textButton} ${selectedValue === opt.id ? styles.activeTextButton : ''}`}
              aria-pressed={selectedValue === opt.id}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionSelector;