/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { mapValues } from 'lodash-es';
import { Field, FieldRenderProps, FormMeta } from '@flowgram.ai/free-layout-editor';
import { IFlowValue } from '@flowgram.ai/form-antd-materials';

import { JsonSchema } from '@editor/typings';
import { useIsSidebar } from '@editor/hooks';
import { FormContent, FormHeader, FormOutputs, PropertiesEdit } from '@editor/form-components';
import { defaultFormMeta } from '../default-form-meta';

export const renderForm = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isSidebar = useIsSidebar();
  if (isSidebar) {
    return (
      <>
        <FormHeader />
        <FormContent>
          <Field
            name="outputs.properties"
            render={({
              field: { value: propertiesSchemaValue, onChange: propertiesSchemaChange },
            }: FieldRenderProps<Record<string, JsonSchema>>) => (
              <Field<Record<string, IFlowValue>> name="inputsValues">
                {({ field: { value: propertiesValue, onChange: propertiesValueChange } }) => {
                  const onChange = (newProperties: Record<string, JsonSchema>) => {
                    const newPropertiesValue = mapValues(newProperties, (v) => v.default);
                    const newPropetiesSchema = mapValues(newProperties, (v) => {
                      delete v.default;
                      return v;
                    });
                    propertiesValueChange(newPropertiesValue);
                    propertiesSchemaChange(newPropetiesSchema);
                  };
                  const value = mapValues(propertiesSchemaValue, (v, key) => ({
                    ...v,
                    default: propertiesValue?.[key],
                  }));
                  return (
                    <>
                      <PropertiesEdit value={value} onChange={onChange} useFx={true} />
                    </>
                  );
                }}
              </Field>
            )}
          />
          <FormOutputs />
        </FormContent>
      </>
    );
  }
  return (
    <>
      <FormHeader />
      <FormContent>
        <FormOutputs />
      </FormContent>
    </>
  );
};

export const formMeta: FormMeta = {
  ...defaultFormMeta,
  render: renderForm,
};
