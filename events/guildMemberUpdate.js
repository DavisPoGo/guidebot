// This event executes when a user is updated

module.exports = (oldMember, newMember) => {
	// let goldRoleCheck = newMember.roles.some(r=>r.name.indexOf("CVM-Gold")==0);


	// console.log(`${newMember.user.username}`);
	// console.log(`${goldRoleCheck}`);
	// oldRoles = oldMember.roles.some(async r=>await r.name.indexOf("CVM-Gold")>0);
	// console.log(`${oldRoles}`);
	// if (oldMember.roles.some(r=>r.name.indexOf("CVM-Gold")>0) && newMember.roles.some(r=>r.name.indexOf("CVM-Gold")<0)) {
	// 	// Remove all Gold level
	// 	newMember.roles.filter(r=>r.name.indexOf("Gold")>0).map(goldRole=>newMember.removeRole(goldRole).then(console.log(`${goldRole.displayName} removed`)).catch(console.error));
	// } else if (oldMember.roles.some(r=>r.name.indexOf("CVM-Silver")>0) && newMember.roles.some(r=>r.name.indexOf("CVM-Silver")<0) ) {
	// 	newMember.roles.filter(r=>r.name.indexOf("Silver")>0).map(silverRole=>newMember.removeRole(silverRole).then(console.log(`${silverRole.displayName} removed`)).catch(console.error));
	// } else if (oldMember.roles.some(r=>r.name.indexOf("CVM-Bronze")>0) && newMember.roles.some(r=>r.name.indexOf("CVM-Bronze")<0) ) {
	// 	newMember.roles.filter(r=>r.name.indexOf("Bronze")>0).map(bronzeRole=>newMember.removeRole(bronzeRole).then(console.log(`${bronzeRole.displayName} removed`)).catch(console.error));
	// }

};
