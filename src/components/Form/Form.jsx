import React, { useCallback, useEffect, useState } from 'react'
import { useTelegram } from '../../hook/useTelegram'
import './Form.css'

function Form() {
    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [subject, setSubject] = useState('physical')
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country, street])
    
    function onChangeCountry(e) {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }
  return (
    <div>
        <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type='text'
                placeholder={'Страна'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type='text'
                placeholder={'Адрес'}
                value={street}
                onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физическое лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>
        </div>
    </div>
  )
}

export default Form