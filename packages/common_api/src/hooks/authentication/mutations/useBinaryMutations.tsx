import React, { useContext } from 'react'
import { AuthenticationMutations } from '@thelasthurrah/authentication_api'

import { AuthAPIProvider } from '../../common/BinaryStashProvider'
import { BinaryStashClient } from '../../../BinaryStashClient'

export const useBinaryAuthMutations = (): AuthenticationMutations => {
    const context = useContext(AuthAPIProvider) as BinaryStashClient

    // console.log('CLIENT', client)

    return context.authentication_mutations
}
