import React from 'react';
import { ExternalLight } from './dynamic/ExternalLight';
import { AmbientInteriorLight } from './dynamic/AmbientInteriorLight';
import { CeilingInteriorLight } from './dynamic/CeilingInteriorLight';
import { LeftInteriorLight } from './dynamic/LeftInteriorLight';
import { RightInteriorLight } from './dynamic/RightInteriorLight';

import { BaseRoomMap } from './map/BaseRoomMap';
import { TopSoftboxMap } from './map/TopSoftboxMap';
import { LeftBladeMap } from './map/LeftBladeMap';
import { RightBladeMap } from './map/RightBladeMap';
import { FrontKickMap } from './map/FrontKickMap';
import { RearKickMap } from './map/RearKickMap';

export const EnvironmentControls: React.FC = () => {
  return (
    <>
      <ExternalLight />
      <AmbientInteriorLight />
      <CeilingInteriorLight />
      <LeftInteriorLight />
      <RightInteriorLight />
      
      <BaseRoomMap />
      <TopSoftboxMap />
      <LeftBladeMap />
      <RightBladeMap />
      <FrontKickMap />
      <RearKickMap />
    </>
  );
};