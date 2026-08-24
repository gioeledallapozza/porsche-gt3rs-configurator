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
          const hasThumbnail = Boolean(preset.thumbnail && preset.thumbnail.trim());

          return (
            <button
              key={preset.id}
              className={`${styles.thumbnailBtn} ${isActive ? styles.active : ''}`}
              onClick={() => setActivePreset(preset.id)}
              aria-label={`View ${preset.name}`}
            >
              <div className={styles.imageWrapper}>
                {hasThumbnail ? (
                  <img
                    src={preset.thumbnail}
                    alt={preset.name}
                    loading={isActive ? "eager" : "lazy"}
                    fetchPriority={isActive ? "high" : "auto"}
                    className={styles.thumbnailImg}
                  />
                ) : (
                  <div className={styles.thumbnailImg} aria-label={`${preset.name} thumbnail unavailable`} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}