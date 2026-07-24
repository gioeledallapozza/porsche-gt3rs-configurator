import { useConfiguratorStore } from '@/store/configuratorStore';
import { cameraPresets } from '@/config/camera/cameraPresets';
import styles from './CameraPresetsUI.module.css';

export default function CameraPresetsUI() {
  const activePreset = useConfiguratorStore((state) => state.activeCameraPreset);
  const setActivePreset = useConfiguratorStore((state) => state.setActiveCameraPreset);

  return (
    <div className={styles.presetsContainer}>
      <div className={styles.scrollWrapper}>
        {cameraPresets.map((preset) => {
          const isActive = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              className={`${styles.thumbnailBtn} ${isActive ? styles.active : ''}`}
              onClick={() => setActivePreset(preset.id)}
              aria-label={`View ${preset.name}`}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={preset.thumbnail} 
                  alt={preset.name}
                  loading="lazy"
                  className={styles.thumbnailImg}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}