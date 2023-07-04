package DBConnect;

use strict;
use warnings;
use DBI;  

use Exporter;
our @ISA = qw(Exporter);

my $dbh;

sub connect{
    my $driver = "mysql";  
    my $database = "apimonitoring";  
    my $dsn      = "dbi:$driver:database=$database";  
    my $user     = "root";  
    my $password = "123456789";  
    $dbh = DBI->connect($dsn, $user, $password) or die $DBI::errstr;  
    return $dbh;
}

sub insert_api_name{
    my $sth = $dbh->prepare("INSERT INTO ADDAPI
                            (API_NAME)
                            values
                            (?)");
    my $rv=$sth->execute(@_) 
            or die $DBI::errstr;
    if(! defined $rv) {print "OOPs! row cannot be inserted.\n";}
    else {print "Row added successfully.\n";}
    $sth->finish();
}

sub fetch_api_name{
    my $sth = $dbh->prepare("SELECT * FROM ADDAPI");  
    $sth->execute() or die $DBI::errstr;  
    while (my @row = $sth->fetchrow_array()) {  
       my ($API_ID,$API_NAME) = @row;  
        print "API_ID = $API_ID, API_NAME = $API_NAME\n";
    # return $API_ID,$API_NAME;  
    }  
    $sth->finish();
}

sub insert_api_url{
    my ($API_NAME, $API_URL) = @_;

    #Fetch API_ID based on API_NAME
    my $sth_select = $dbh->prepare("SELECT API_ID FROM ADDAPI WHERE API_NAME = ?");
    $sth_select->execute($API_NAME) or die $dbh->errstr;
    my ($API_ID) = $sth_select->fetchrow_array;
    $sth_select->finish();

    #Insert API_ID and API_URL into ADDAPI_URL table.
    my $sth_insert = $dbh->prepare("INSERT INTO ADDAPI_URL
                            (API_ID,API_URL)
                            values
                            (?,?)");
    my $rv=$sth_insert->execute($API_ID,$API_URL) or die $dbh->errstr; 
            # or die $DBI::errstr;
    if(! defined $rv) {print "OOPs! row cannot be inserted.\n";}
    else {print "Row added successfully.\n";}
    $sth_insert->finish();
}

sub fetch_api_url{
    my $sth = $dbh->prepare("SELECT * FROM ADDAPI_URL");  
    $sth->execute() or die $DBI::errstr;  
    while (my @row = $sth->fetchrow_array()) {  
       my ($URL_ID,$API_ID,$API_URL) = @row;  
        print "URL_ID = $URL_ID, API_ID = $API_ID, API_URL = $API_URL\n";  
   # return $URL_ID,$API_ID,$API_URL;
    }  
    $sth->finish();
}

sub insert_api_status{
    my $sth = $dbh->prepare("INSERT INTO ADDAPI_STATUS
                            (URL_ID,URL_STATUS,RESPONSE_TIME)
                            values
                            ( ?,?,?)");
    my $rv=$sth->execute(@_) 
            or die $DBI::errstr;
    if(! defined $rv) {print "OOPs! row cannot be inserted.\n";}
    else {print "Row added successfully.\n";}
    $sth->finish();
}

sub fetch_api_status{
    my ($API_NAME) = @_;

    #Fetch API_ID based on API_NAME
    my $sth_select = $dbh->prepare("SELECT API_ID FROM ADDAPI WHERE API_NAME = ?");  
    $sth_select->execute($API_NAME) or die $dbh->errstr; 
    my ($API_ID) = $sth_select->fetchrow_array;
    # print "API_ID=$API_ID\n";
    $sth_select->finish();

    #Fetch URL_ID based on API_ID
    my $sth_select_urlid = $dbh->prepare("SELECT MAX(URL_ID) FROM ADDAPI_URL WHERE API_ID = ?") ;
    $sth_select_urlid->execute($API_ID) or die $dbh->errstr; 
    my ($URL_ID) = $sth_select_urlid->fetchrow_array;
    # print "URL_ID=$URL_ID\n";
    $sth_select_urlid->finish();

    #Fetch RESPONSE_TIME based on URL_ID
    my $sth_select_responsetime = $dbh->prepare("SELECT RESPONSE_TIME FROM ADDAPI_STATUS WHERE STATUS_ID IN (SELECT MAX(STATUS_ID) FROM ADDAPI_STATUS WHERE URL_ID = ?)");
    $sth_select_responsetime->execute($URL_ID) or die $dbh->errstr; 
    my ($RESPONSE_TIME) = $sth_select_responsetime->fetchrow_array;    
    $sth_select_responsetime->finish();

    #Fetch Total_Pass based on URL_ID
    my $sth_select_pass = $dbh->prepare("SELECT COUNT(*) FROM ADDAPI_STATUS WHERE URL_ID = ? AND URL_STATUS = 1");
    $sth_select_pass->execute($URL_ID) or die $dbh->errstr; 
    my ($countp) = $sth_select_pass->fetchrow_array;    
    $sth_select_pass->finish();

    #Fetch Total_Fail based on URL_ID
    my $sth_select_fail = $dbh->prepare("SELECT COUNT(*) FROM ADDAPI_STATUS WHERE URL_ID = ? AND URL_STATUS = 0");
    $sth_select_fail->execute($URL_ID) or die $dbh->errstr; 
    my ($countf) = $sth_select_fail->fetchrow_array;
    $sth_select_fail->finish();

    my $total_count = $countp + $countf;
 
    print "Total Count = $total_count\n";    
    print "Count Pass = $countp\n";
    print "Count Fail = $countf\n";
    print "RESPONSE_TIME = $RESPONSE_TIME\n";
    
     #return ($total_count,$countp,$countf,$RESPONSE_TIME );
   
}
1;