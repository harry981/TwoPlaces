{
    let createPost=function(){
        let newPostForm=$('#new-post-form')

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                     
                },
                error:function(error){
                    console.log(error.ResponseText)
                }
            })
        });
    }

    createPost();
}