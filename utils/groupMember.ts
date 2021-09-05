export function checkMemberList(data: any[]) {
  for (const index of data) {
    if (!data[index].account) {
      return false
    }
  }
  return true
}
export function generateGroupMemberInfo(groupId: string, data: any[]) {
  const groupMembers = data.map(item => {
    return {
      account: item.account,
      type: '0',
      groupId,
      nickName: ''
    }
  })
  return groupMembers;
}