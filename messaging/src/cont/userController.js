const { newMemberValidator } = require('../validators/newMemberValidator');
const bcrypt = require('bcrypt');


module.exports = {
    registerMember: async (req, res) => {
        try {
            const { pool } = req;
            let member = req.body;
            let hashedpwd = await bcrypt.hash(member.Password, 8);
            let { value } = newMemberValidator(member);
            if (pool && pool.connected) {
                let results = await pool.request()
                    .input("RegNo", value.RegNo)
                    .input("Name", value.Name)
                    .input("Course", value.Course)
                    .input("Email", value.Email)
                    .input("Password", hashedpwd)
                    .execute('InsertUser');
                console.log(results);
        
                res.json({
                    success: true,
                    message: "Member registered successfully",
                    data: results.recordsets[0]
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: error.message });
        }
    },
    loginUser: async (req, res) => {
        const { RegNo, Password } = req.body;
        const { pool } = req;
        try {
            const request = pool.request();
            request.input('RegNo', RegNo);
            const result = await request.query('SELECT UserID, RegNo, Password FROM Users WHERE RegNo = @RegNo');
            const member = result.recordset[0];
            console.log(member)

            if (member) {
                const passwordMatch = await bcrypt.compare(Password, member.Password);
                if (passwordMatch) {
                    req.session.member_id = member.UserID;
                    req.session.authorized = true;
                    req.session.member = RegNo;
                    res.json({
                        success: true,
                        message: "Member logged in successfully",
                        data: {
                            session_id: req.sessionID,
                            member_id: member.UserID,
                            member_name: member.RegNo,
                        }
                    });
                    console.log(req.session);
                } else {
                    res.status(401).json({ message: "Invalid username or password" });
                }
            } else {
                res.status(404).json({ message: "You are not registered!" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getDets: async (req, res) => {
        try {
          const { pool } = req;
          const UserID  = req.session.member_id;
          console.log(UserID)
    
          if (pool && pool.connected) {
            let results = await pool
              .request()
              .input("UserID", UserID)
              .execute('GetDets');
    
            const Dets = results.recordset;
    
            res.json({
              success: true,
              message: "Details retrieved successfully",
              data: Dets
            });
          } else {
            res.status(500).json({ message: "Internal server error" });
          }
        } catch (error) {
          console.error("Error:", error);
          res.status(500).json({ error: error.message });
        }
      },
    
}