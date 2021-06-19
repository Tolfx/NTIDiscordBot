<template>
    <div>
        <form action="https://api.discord.ntikronhus.com/config/create" method="POST">
            <label for="name">Config lesson *</label>
            <input type="text" name="name" placeholder="Name for lesson">

            <label for="">Class *</label>
            <select name="class">
                <!-- Loop for each class -->
                <option selected>Choose...</option>
                <option value="1">IT19A</option>
                <option value="2">MA19B</option>
                <option value="3">MA19A</option>
            </select>

            <label for="lenght">Length of lesson *</label>
            <input type="text" name="length" placeholder="1h 10m">

            <label for="min_cam_length">Minimun length for camera</label>
            <input type="text" name="min_cam_length" placeholder="5m">

            <label for="min_stream_length">Minimun length for streaming</label>
            <input type="text" name="min_stream_length" placeholder="5m">
            
            <label for="min_msg_length">Minimun length for messages</label>
            <input type="text" name="min_msg_length" placeholder="5">

            <label for="min_mobile_time">Minimun time on mobile</label>
            <input type="text" name="min_mobile_time" placeholder="5m">

            <label for="hall">Hall</label>
            <input type="text" name="hall" placeholder="302">

            <button type="submit">Submit</button>
        </form>
    </div>
</template>
<script>

</script>
