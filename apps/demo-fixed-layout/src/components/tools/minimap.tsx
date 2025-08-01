/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowMinimapService, MinimapRender } from '@flowgram.ai/minimap-plugin';
import { useService } from '@flowgram.ai/fixed-layout-editor';

import { MinimapContainer } from './styles';

export const Minimap = ({ visible }: { visible?: boolean }) => {
  const minimapService = useService(FlowMinimapService);
  if (!visible) {
    return <></>;
  }
  return (
    <MinimapContainer>
      <MinimapRender
        service={minimapService}
        panelStyles={{}}
        containerStyles={{
          pointerEvents: 'auto',
          position: 'relative',
          top: 'unset',
          right: 'unset',
          bottom: 'unset',
          left: 'unset',
        }}
        inactiveStyle={{
          opacity: 1,
          scale: 1,
          translateX: 0,
          translateY: 0,
        }}
      />
    </MinimapContainer>
  );
};
