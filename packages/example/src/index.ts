import { PrismaClient } from '@prisma/client'
import { sum } from '@jkomyno/common-utils'

function main() {
  const prisma = new PrismaClient()

  const arr = [1, 2, 3]
  console.log(`Summing ${arr.join(', ')} results in ${sum(arr)}`)
}

main()
