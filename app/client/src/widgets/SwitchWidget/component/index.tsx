import { Alignment, Classes, Switch } from "@blueprintjs/core";
import { BlueprintControlTransform } from "constants/DefaultTheme";
import React from "react";
import styled from "styled-components";
import { ComponentProps } from "widgets/BaseComponent";
import { AlignWidget } from "widgets/constants";
import { Colors } from "constants/Colors";

interface SwitchComponentProps extends ComponentProps {
  label: string;
  isSwitchedOn: boolean;
  onChange: (isSwitchedOn: boolean) => void;
  isLoading: boolean;
  alignWidget: AlignWidget;
  backgroundColor: string;
}

const SwitchComponentContainer = styled.div<{
  backgroundColor: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  .${Classes.CONTROL} {
    margin: 0;
  }
  &.${Alignment.RIGHT} {
    justify-content: flex-end;
  }
  ${BlueprintControlTransform}

  && {
    .${Classes.CONTROL} {
      & input:checked ~ .${Classes.CONTROL_INDICATOR} {
        background: ${({ backgroundColor }) =>
          `${backgroundColor || Colors.GREEN}`};
        border: 2px solid
          ${({ backgroundColor }) => `${backgroundColor || Colors.GREEN}`};
      }
    }

    .${Classes.SWITCH} {
      & input:not(:disabled):active:checked ~ .${Classes.CONTROL_INDICATOR} {
        background: ${({ backgroundColor }) =>
          `${backgroundColor || Colors.WHITE}`};
      }
    }
  }
`;

export function SwitchComponent({
  alignWidget,
  backgroundColor,
  isDisabled,
  isLoading,
  isSwitchedOn,
  label,
  onChange,
}: SwitchComponentProps) {
  const switchAlignClass =
    alignWidget === "RIGHT" ? Alignment.RIGHT : Alignment.LEFT;

  return (
    <SwitchComponentContainer
      backgroundColor={backgroundColor}
      className={switchAlignClass}
    >
      <Switch
        alignIndicator={switchAlignClass}
        checked={isSwitchedOn}
        className={
          isLoading
            ? `${Classes.SKELETON} t--switch-widget-loading`
            : `${
                isSwitchedOn
                  ? "t--switch-widget-active"
                  : "t--switch-widget-inactive"
              }`
        }
        disabled={isDisabled}
        label={label}
        onChange={() => onChange(!isSwitchedOn)}
      />
    </SwitchComponentContainer>
  );
}
