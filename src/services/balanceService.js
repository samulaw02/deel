const { Contract, Profile, Job } = require('../models/index.js');
const sequelize = require('../models/db.js');

async function depositIntoBalance(userId, amount) {
    const t = await sequelize.transaction();
    try {
        const client = await Profile.findOne({where: {id: userId, type: 'client'}});
        if (!client) {
            await t.rollback();
            return { sucess: false, error: 'Wrong Client ID' };
        }
        const totalJobPrices = await Job.sum('price', {
            where: {
                paid: false,
            },
            include: [
                {
                    model: Contract,
                    where: {
                        status: 'in_progress',
                        ClientId: client.id,
                    },
                },
            ],
        });
        if (amount > totalJobPrices * 0.25) {
            await t.rollback();
            return { success: false, error: 'Deposit amount exceeds 25% of total job prices.' };
        }
        await Profile.update(
            { balance: client.balance + amount },
            { where: { id: client.id }, transaction: t }
        );
        await t.commit();
        return { success: true, message: 'Deposit successful.' };
    } catch (error) {
        console.error(error);
        await t.rollback();
        return { success: false, error: 'Internal server error.' };
    }
}

module.exports = {
    depositIntoBalance
};