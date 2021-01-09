import { ChangeEvent, FC, useCallback } from 'react'
import { BaseProps } from '../../..'
import { defaults, TextMeta, TextSize } from '..'

const TextConfigure: FC<BaseProps<TextMeta>> = ({ meta, setMeta, applyMeta }) => {
  const value = meta?.value ?? defaults.value
  const size = meta?.size ?? defaults.size

  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value
      setMeta({ ...(meta ?? {}), value: newValue })
    },
    [meta, setMeta]
  )

  const handleSizeChange = useCallback(
    (size: TextSize) => {
      setMeta({ ...(meta ?? {}), size })
      applyMeta()
    },
    [applyMeta, meta, setMeta]
  )

  return (
    <div>
      <label>
        value:&nbsp;
        <textarea value={value} onChange={handleValueChange} onBlur={applyMeta} rows={5} placeholder="[empty]" />
      </label>
      <br />
      <fieldset>
        <legend>size</legend>
        <label>
          <input
            type="radio"
            value={TextSize.SMALL}
            checked={size === TextSize.SMALL}
            onChange={(event) => {
              if (event.target.checked) {
                handleSizeChange(TextSize.SMALL)
              }
            }}
          />
          small
        </label>
        <label>
          <input
            type="radio"
            value={TextSize.NORMAL}
            checked={size === TextSize.NORMAL}
            onChange={(event) => {
              if (event.target.checked) {
                handleSizeChange(TextSize.NORMAL)
              }
            }}
          />
          normal
        </label>
        <label>
          <input
            type="radio"
            value={TextSize.LARGE}
            checked={size === TextSize.LARGE}
            onChange={(event) => {
              if (event.target.checked) {
                handleSizeChange(TextSize.LARGE)
              }
            }}
          />
          large
        </label>
      </fieldset>
    </div>
  )
}

export default TextConfigure
