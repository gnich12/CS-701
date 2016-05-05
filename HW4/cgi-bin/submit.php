<!DOCTYPE html>
<html>
<head>
<title>Form Example 1</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css" />
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
</head>

<body>


        <div data-role='page'>
          <div data-role='header'>
            <h1>Form Result</h1>
          </div>


	<div data-role="content">
		<ul data-role='listview' data-inset='true'>
  
<?php          
  
foreach ($_POST as $key => $value) {

    if (is_array($value)) {
      foreach ($value as $v) {
          echo '<li>'.$key.'='.$v.'</li>';
      }
    }
    else {
      echo '<li>'.$key.'='.$value.'</li>';
    }
}



?>
                 </ul>

		
	</div>

</div>

</body>
</html>

