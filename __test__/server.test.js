"use strict"

// require('dotenv').config();
const base64 = require('base-64')
const bcrypt = require('bcrypt')
const {app} = require('../src/server');
const supertest = require('supertest');
const req = supertest(app);
const { db } = require('../src/models/index');
// const auth = require('../src/routes/auth')
console.log(db)

beforeAll(async () => {
    await db.sync();
  })

afterAll(async () => {
    await db.drop();
  })

  describe('testing the server', () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbWEiLCJpYXQiOjE2ODg1OTk0OTB9.LJLDdXpDD3n276WQVPTCBUBR5yjPzJzVtFMBfBYZxSo';
    it('POST to /signup to create a new user.', async () => {
        const res = await req.post('/signup').send({
            username: "rama",
            password: "123",
            role: "manager"
        })
        expect(res.status).toBe(201);
        expect(res.body.user.username).toEqual('rama')
    });
    it('POST to /signin to create a new user.', async () => {
        const res = await req.post('/signin')
        .set('Authorization',`Basic ${await base64.encode('rama:123')}`)
        expect(res.status).toBe(200);
    });
    it('GET to /secret to create a new user.', async () => {
        const res = await req.get('/secret')
        .set('Authorization',`Bearer ${token}`)
        expect(res.status).toBe(200);
    });
    it('should fail to access an authenticated route without a token', async () => {
        const res = await req
          .get('/secret');
    
        // Assert the expected behavior based on the authentication status
        expect(res.status).toBe(500);
        // ...
      });

    it('404 on a bad route', async () => {
        const res = await req.get('/pagenotFound')
        expect(res.status).toBe(404);
      });
      
      it('404 on a bad method', async () => {
        const res = await req.post('/1')
        expect(res.status).toBe(404);
      });
    

      it('Add new student record', async () => {
        const res = await req.post('/api/student').send({
          name: "saleh",
          grade: 9,
          age: "15",
          studentID: 1
        });
        const createdFood = JSON.parse(res.text);
        expect(res.status).toBe(201);
        expect(createdFood.name).toEqual('saleh')
      });
    
      it('all student records ', async () => {
        const res = await req.get('/api/student');
        expect(res.status).toBe(200);
      })
    
      it('Read one student record using id ', async () => {
        const res = await req.get('/api/student/1');
        expect(res.status).toBe(200);
      })
    
      it('Update student record using id', async () => {
        const res = await req.put('/api/student/1');
        expect(res.status).toBe(200);
      })
    
      it('Delete student record using id', async () => {
        const res = await req.delete('/api/student/1');
        expect(res.status).toBe(204);
      })
    







      /////////////////////
      it('POST to /student to create a new student.', async () => {
        const res = await req.post('/main/student').send({
            name: "saleh",
            grade: 9,
            age: "15",
            studentID: 1
        }).set('Authorization',`Bearer ${token}`)
        expect(res.status).toBe(201);
        
    });


    //   it('GET By Id to /student to get student by id', async () => {
    //     const res = await req.get('/main/student/1')
    //     expect(res.status).toBe(200);
    //     expect(res.body.grade).toBe('9');
    // });
    //   it('GET ALL to /student to create a new rag.', async () => {
    //     const res = await req.get('/main/student')
    //     expect(res.status).toBe(200);
    //     expect(Array.isArray(res.body)).toBe(true);
    // });
    // it('Update to /student to update student info', async () => {
    //     const res = await req.put('/main/student/1').send({
    //       name: "ahmad",
    //       grade: 9,
    //       age: "15",
    //       studentID: 1
    //     }).set('Authorization',`Bearer ${token}`)
    //     expect(res.status).toBe(202);
    //     expect(res.body.name).toBe("ahmad");
        
    // });
    // it('Delete to /student to Delete a student', async () => {
    //     const res = await req.delete('/main/student/1').set('Authorization',`Bearer ${token}`)
    //     expect(res.status).toBe(200);
    //     expect(res.body).toBe(1);
        
    // });
  })