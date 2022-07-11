import React, { useContext } from 'react'

import { AuthAPIProvider } from '../common/BinaryStashProvider'
import { BinaryStashClient } from '../../BinaryStashClient'

export const useBinaryAuthQueries = () => {
    const context = useContext(AuthAPIProvider) as BinaryStashClient

    return context.authentication_queries
}
