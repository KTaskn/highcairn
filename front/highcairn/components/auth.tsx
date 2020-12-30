import React from 'react'
import FetchWrapper from '../utilities/fetchwrapper'

interface CheckResponse {
    result?: boolean
}

interface Props {
    FC: React.FC,
    cookie: any
}

const Auth: React.FC<Props> = ({FC, cookie}) => {
    const [content, setContent] = React.useState(<div>no auth</div>)

    React.useEffect(() => {
        let response =  FetchWrapper.get<CheckResponse>('/api/check/', {
            'cookie': cookie
        }).then((response) => {
            if (response.raw.ok) {
                setContent(<FC />)
            }
        })
    }, [])

    return content
}

export default Auth